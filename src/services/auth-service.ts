import {inject, injectable} from "inversify";
import bcrypt from "bcrypt";
import add from "date-fns/add";
import {v4 as uuidv4} from "uuid";
import {UsersService} from "./users-service";
import {DevicesSessionsService} from "./devices-sessions-service";
import {EmailManager} from "../managers/email-manager";
import {CreateUserInputModel} from "../models/users/input-models";
import {PasswordRecoveryConfirmationInputModel} from "../models/auth-models";
import {EntityWithoutId} from "../common/interfaces";
import {EMAIL_SERVICE_ERROR_MESSAGE} from "../common/error-messages";
import {NotFoundError} from "../classes/errors";
import {DeviceSession} from "../classes/devices-sessions";
import {DbUser} from "../repositories/interfaces/users-interfaces";

@injectable()
export class AuthService {
	constructor(
		@inject(UsersService) protected usersService: UsersService,
		@inject(EmailManager) protected emailManager: EmailManager,
		@inject(DevicesSessionsService) protected devicesSessionsService: DevicesSessionsService,
	) {}
	
	async registerUser(userData: CreateUserInputModel): Promise<string> {
		const { password } = userData;
		const passwordSalt = await bcrypt.genSalt(10);
		const passwordHash = await this.generateHash(password, passwordSalt);
		
		const createdUserId = await this.usersService.createUser(
			userData, passwordHash, passwordSalt
		);
		const createdUser = await this.usersService.getUserById(createdUserId);
		
		if (!createdUser) throw new NotFoundError();
		
		try {
			await this.emailManager.sendRegistrationEmail(createdUser);
			return createdUserId;
		} catch (error) {
			console.error(error)
			await this.usersService.deleteUser(createdUserId);
			throw new Error(EMAIL_SERVICE_ERROR_MESSAGE);
		}
	}
	
	async confirmRegistration(user: DbUser): Promise<void> {
		return this.usersService.updateUserConfirmation(user);
	}
	
	async resendRegistrationEmail(user: DbUser): Promise<void> {
		try {
			const newConfirmationCode = uuidv4();
			await this.usersService.updateUser(String(user._id), {
				"emailConfirmation.confirmationCode": newConfirmationCode,
				"emailConfirmation.expirationDate": add(new Date(), {hours: 1})
			});
			const updatedUser = await this.usersService.getUserById(String(user._id));
			
			if (updatedUser) {
				return this.emailManager.sendRegistrationEmail(updatedUser);
			}
		} catch (error) {
			console.error(error);
		}
	}
	
	async checkCredentials(loginOrEmail: string, password: string): Promise<string | null> {
		const user = await this.usersService.getUserByFilter({login: loginOrEmail, email: loginOrEmail});
		
		if (!user) return null;
		
		const hash = await this.generateHash(password, user.passwordSalt);
		return hash === user.passwordHash ? String(user._id) : null;
	}
	
	async generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
	
	async updateDeviceSessionData(_id: string, issuedAt: number): Promise<void> {
		return this.devicesSessionsService.updateDeviceSession(_id, {issuedAt});
	}
	
	async createDeviceSession(deviceSessionDataInputModel: EntityWithoutId<DeviceSession>): Promise<string> {
		return this.devicesSessionsService.createDeviceSession(deviceSessionDataInputModel);
	}
	
	async logout(deviceSessionId: string): Promise<void> {
		return this.devicesSessionsService.deleteDeviceSessionById(deviceSessionId);
	}
	
	async recoverPassword(id: string, email: string): Promise<void> {
		const passwordRecoveryCode = uuidv4();
		await this.usersService.updateUser(id, {passwordRecoveryCode});
		
		try {
			return this.emailManager.recoverPassword(email, passwordRecoveryCode);
		} catch (error) {
			throw new Error(EMAIL_SERVICE_ERROR_MESSAGE);
		}
	}
	
	async confirmPasswordRecovery(
		user: DbUser,
		passwordRecoveryData: PasswordRecoveryConfirmationInputModel
): Promise<void> {
		const { recoveryCode, newPassword } = passwordRecoveryData;
		const newPasswordHash = await this.generateHash(newPassword, user.passwordSalt);
		
		return this.usersService
			.updateUser(String(user._id), {passwordHash: newPasswordHash, passwordRecoveryCode: recoveryCode});
	}
}
