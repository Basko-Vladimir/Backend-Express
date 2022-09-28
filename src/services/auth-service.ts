import bcrypt from "bcrypt";
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
			await emailManager.sendRegistrationEmail(user);
			return usersService.updateUserConfirmation(user);
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
