import bcrypt from "bcrypt"
import {authService} from "./auth-service";
import {User} from "../classes/users";
import {usersRepository} from "../repositories/users/users-repository";
import {CreateUserInputModel} from "../models/users/input-models";
import {UserFilter} from "../repositories/interfaces/users-interfaces";
import {usersCollection} from "../repositories/db";
import {DataBaseError} from "../classes/errors";

export const usersService = {
	async getUserById(userId: string): Promise<User | null> {
		return usersRepository.getUserById(userId);
	},
	
	async getUserByFilter(userFilter: UserFilter): Promise<User | null> {
		return usersRepository.getUserByFilter(userFilter);
	},
	
	async createUser(userData: CreateUserInputModel): Promise<string> {
		const {login, email, password} = userData;
		const passwordSalt = await bcrypt.genSalt(10);
		const passwordHash = await authService.generateHash(password, passwordSalt);
		
		const newUser = new User(login, email, passwordSalt, passwordHash);
		return usersRepository.createUser(newUser);
	},
	
	async deleteUser(id: string): Promise<void> {
		return usersRepository.deleteUser(id);
	},
	
	async deleteAllUsers(): Promise<void> {
		return usersRepository.deleteAllUsers();
	},
	
	async updateUserConfirmation(user: User): Promise<void> {
		const {matchedCount} = await usersCollection.updateOne(
			{"emailConfirmation.confirmationCode": user.emailConfirmation.confirmationCode},
			{$set: {"emailConfirmation.isConfirmed": true}}
		);
		
		if (!matchedCount) throw new DataBaseError();
	}
}
