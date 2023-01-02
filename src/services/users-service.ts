import bcrypt from "bcrypt"
import {User} from "../classes/users";
import {usersRepository} from "../repositories/users/users-repository";
import {CreateUserInputModel} from "../models/users/input-models";
import {DbUser} from "../repositories/interfaces/users-interfaces";

export const usersService = {
	async getUserById(userId: string): Promise<DbUser> {
		return usersRepository.getUserById(userId);
	},
	
	async createUser(userData: CreateUserInputModel): Promise<string> {
		const { login, email, password } = userData;
		const passwordSalt = await bcrypt.genSalt(10);
		const passwordHash = await this._generateHash(password, passwordSalt);
		
		const newUser = new User(login, email, passwordSalt, passwordHash);
		return usersRepository.createUser(newUser);
	},
	
	async deleteUser(id: string): Promise<void> {
		return usersRepository.deleteUser(id);
	},
	
	async deleteAllUsers(): Promise<void> {
		return usersRepository.deleteAllUsers();
	},
	
	async checkCredentials(login: string, password: string): Promise<string | null> {
		const user = await usersRepository.getUserByLogin(login);
		
		if (!user) return null;
		
		const hash = await this._generateHash(password, user.passwordSalt);
		return hash === user.passwordHash ? String(user._id) : null;
	},
	
	async _generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
};
