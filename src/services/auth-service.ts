import bcrypt from "bcrypt";
import add from "date-fns/add";
import {v4 as uuidv4} from "uuid";
import {EmailManager} from "../managers/email-manager";
import {CreateUserInputModel} from "../models/users/input-models";
import {User} from "../classes/users";
import {UsersService} from "./users-service";

export class AuthService {
	constructor(
		protected usersService: UsersService,
		protected emailManager: EmailManager,
	) {
	}
	
	async registerUser(userData: CreateUserInputModel): Promise<void> {
		const createdUserId = await this.usersService.createUser(userData);
		const createdUser = await this.usersService.getUserById(createdUserId);
		
		if (createdUser) {
			try {
				return this.emailManager.sendRegistrationEmail(createdUser);
			} catch (error) {
				console.error(error)
				return this.usersService.deleteUser(createdUserId);
			}
		}
	}
	
	async confirmRegistration(user: User): Promise<void> {
		return this.usersService.updateUserConfirmation(user);
	}
	
	async resendRegistrationEmail(user: User): Promise<void> {
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
	
	async checkCredentials(login: string, password: string): Promise<string | null> {
		const user = await this.usersService.getUserByFilter({login});
		
		if (!user) return null;
		
		const hash = await this.generateHash(password, user.passwordSalt);
		return hash === user.passwordHash ? String(user._id) : null;
	}
	
	async generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
}
