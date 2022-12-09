import bcrypt from "bcrypt"
import {inject, injectable} from "inversify";
import {User} from "../classes/users";
import {UsersRepository} from "../repositories/users/users-repository";
import {CreateUserInputModel} from "../models/users/input-models";
import {UserFilter} from "../repositories/interfaces/users-interfaces";
import {AuthService} from "./auth-service";

@injectable()
export class UsersService {
	constructor(
		@inject(UsersRepository) protected usersRepository: UsersRepository,
		@inject(AuthService) protected authService: AuthService
	) {}
	
	async getUserById(userId: string): Promise<User | null> {
		return this.usersRepository.getUserById(userId);
	}
	
	async getUserByFilter(userFilter: UserFilter): Promise<User | null> {
		return this.usersRepository.getUserByFilter(userFilter);
	}
	
	async createUser(userData: CreateUserInputModel): Promise<string> {
		const {login, email, password} = userData;
		const passwordSalt = await bcrypt.genSalt(10);
		const passwordHash = await this.authService.generateHash(password, passwordSalt);
		
		const newUser = new User(login, email, passwordSalt, passwordHash);
		return this.usersRepository.createUser(newUser);
	}
	
	async updateUser(userId: string, updatedField: {[key: string]: unknown}): Promise<void> {
		return this.usersRepository.updateUser(userId, updatedField);
	}
	
	async deleteUser(id: string): Promise<void> {
		return this.usersRepository.deleteUser(id);
	}
	
	async deleteAllUsers(): Promise<void> {
		return this.usersRepository.deleteAllUsers();
	}
	
	async updateUserConfirmation(user: User): Promise<void> {
		return this.usersRepository.updateUserConfirmation(user);
	}
}
