import bcrypt from "bcrypt";
import add from "date-fns/add";
import { v4 as uuidv4 } from "uuid";
import {usersService} from "./users-service";
import {emailManager} from "../managers/email-manager";
import {CreateUserInputModel} from "../models/users/input-models";
import { User } from "../classes/users";

export const authService = {
	async registerUser(userData: CreateUserInputModel): Promise<void> {
	  const createdUserId = await usersService.createUser(userData);
		const createdUser = await usersService.getUserById(createdUserId);
		
		if (createdUser) {
			try {
				return emailManager.sendRegistrationEmail(createdUser);
			} catch (error) {
				console.error(error)
				return usersService.deleteUser(createdUserId);
			}
		}
	},
	
	async confirmRegistration(user: User) {
		return usersService.updateUserConfirmation(user);
	},
	
	async resendRegistrationEmail(user: User) {
		try {
			const newConfirmationCode = uuidv4();
			await usersService.updateUser(String(user._id), {
				"emailConfirmation.confirmationCode": newConfirmationCode,
				"emailConfirmation.expirationDate": add(new Date(), {hours: 1})
			});
			const updatedUser = await usersService.getUserById(String(user._id));
			
			if (updatedUser) {
				await emailManager.sendRegistrationEmail(updatedUser);
				return usersService.updateUserConfirmation(updatedUser);
			}
		} catch (error) {
			console.error(error);
		}
	},
	
	async checkCredentials(login: string, password: string): Promise<string | null> {
		const user = await usersService.getUserByFilter({login});
		
		if (!user || !user.emailConfirmation.isConfirmed) return null;
		
		const hash = await this.generateHash(password, user.passwordSalt);
		return hash === user.passwordHash ? String(user._id) : null;
	},
	
	async generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
};
