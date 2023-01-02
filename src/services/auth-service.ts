import {usersRepository} from "../repositories/users/users-repository";
import bcrypt from "bcrypt";

export const authService = {
	async checkCredentials(login: string, password: string): Promise<string | null> {
		const user = await usersRepository.getUserByLogin(login);
		
		if (!user) return null;
		
		const hash = await this.generateHash(password, user.passwordSalt);
		return hash === user.passwordHash ? String(user._id) : null;
	},
	
	async generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
};
