import bcrypt from "bcrypt"
import {User} from "../classes/users";
import {usersRepository} from "../repositories/users/users-repository";
import {CreateUserInputModel} from "../models/users/input-models";

export const usersService = {
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
	
	async checkCredentials(login: string, password: string): Promise<boolean> {
		const user = await usersRepository.getUserByLogin(login);
		
		if (!user) return false;
		
		const hash = await this._generateHash(password, user.passwordSalt);
		return hash === user.passwordHash;
	},
	
	async _generateHash(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
};
