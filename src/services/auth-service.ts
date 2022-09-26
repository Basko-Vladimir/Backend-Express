import bcrypt from "bcrypt";
import {usersService} from "./users-service";
import {emailManager} from "../managers/email-manager";
import {CreateUserInputModel} from "../models/users/input-models";

export const authService = {
	async registerUser(userData: CreateUserInputModel): Promise<void> {
	  const createdUserId = await usersService.createUser(userData);
		const createdUser = await usersService.getUserById(createdUserId);
		
		if (createdUser) {
			return emailManager.sendRegistrationEmail(createdUser);
		}
	},
	
	async checkCredentials(login: string, password: string): Promise<string | null> {
		const user = await usersService.getUserByFilter({login});
		
		if (!user) return null;
		
		const hash = await this.generateHash(password, user.passwordSalt);
		return hash === user.passwordHash ? String(user._id) : null;
	},
	
	async generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
};
