import {inject, injectable} from "inversify";
import bcrypt from "bcrypt";
import {UsersService} from "./users-service";
import {DevicesSessionsService} from "./devices-sessions-service";
import {EmailManager} from "../managers/email-manager";
import {CreateUserInputModel} from "../../api/models/users/input-models";
import {PasswordRecoveryConfirmationInputModel} from "../../api/models/auth-models";
import {EntityWithoutId} from "../../common/interfaces";
import {EMAIL_SERVICE_ERROR_MESSAGE} from "../../common/errors/error-messages";
import {DeviceSession} from "../../domain/entities/devices-sessions";
import {NotFoundError} from "../../common/errors/errors-types";
import { IUser } from "../../domain/users/UserTypes";

@injectable()
export class AuthService {
	constructor(
		@inject(UsersService) protected usersService: UsersService,
		@inject(EmailManager) protected emailManager: EmailManager,
		@inject(DevicesSessionsService) protected devicesSessionsService: DevicesSessionsService,
	) {}
	
	async registerUser(userData: CreateUserInputModel, isConfirmedByDefault: boolean = false): Promise<string> {
		const { password } = userData;
		const passwordSalt = await bcrypt.genSalt(10);
		const passwordHash = await this.generateHash(password, passwordSalt);
		
		const createdUserId = await this.usersService.createUser(userData, passwordHash, passwordSalt, isConfirmedByDefault);
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
	
	async confirmRegistration(user: IUser): Promise<void> {
		return this.usersService.confirmRegistration(user);
	}
	
	async resendRegistrationEmail(user: IUser): Promise<void> {
		try {
			const updatedUser = await this.usersService.updateConfirmationCode(user);
			
			return this.emailManager.sendRegistrationEmail(updatedUser);
		} catch (error) {
			console.error(error);
		}
	}
	
	async checkCredentials(loginOrEmail: string, password: string): Promise<string | null> {
		const user = await this.usersService.getUserByFilter({login: loginOrEmail, email: loginOrEmail});
		
		if (!user) return null;
		
		const isMatchedUser = await bcrypt.compare(password, user.passwordHash);
		
		return isMatchedUser ? String(user._id) : null;
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
	
	async recoverPassword(email: string): Promise<void> {
		const updatedUser = await this.usersService.updatePasswordRecoveryCode(email);
		
		try {
			return this.emailManager.recoverPassword(email, updatedUser.passwordRecoveryCode!);
		} catch (error) {
			throw new Error(EMAIL_SERVICE_ERROR_MESSAGE);
		}
	}
	
	async confirmPasswordRecovery(
		user: IUser,
		passwordRecoveryData: PasswordRecoveryConfirmationInputModel
): Promise<void> {
		const { recoveryCode, newPassword } = passwordRecoveryData;
		const newPasswordHash = await this.generateHash(newPassword, user.passwordSalt);
		
		return this.usersService.updateUserPassword(user, newPasswordHash, recoveryCode);
	}
}
