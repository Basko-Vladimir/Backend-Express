import {User} from "../classes/users";
import {usersRepository} from "../repositories/users/users-repository";
import {CreateUserInputModel} from "../models/users/input-models";

export const usersService = {
	async createUser(userData: CreateUserInputModel): Promise<string> {
		const newUser = new User(userData.login, userData.email)
		return usersRepository.createUser(newUser);
	},
	
	async deleteUser(id: string): Promise<void> {
		return usersRepository.deleteUser(id);
	},
	
	async deleteAllUsers(): Promise<void> {
		return usersRepository.deleteAllUsers();
	}
};
