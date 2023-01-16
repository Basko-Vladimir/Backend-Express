import {inject, injectable} from "inversify";
import {User} from "../../domain/entities/users";
import {UsersRepository} from "../../infrastructure/repositories/users/users-repository";
import {CreateUserInputModel} from "../../api/models/users/input-models";
import {DbUser, UserFilter} from "../../infrastructure/repositories/interfaces/users-interfaces";
import {UpdateOrFilterModel} from "../../common/interfaces";

@injectable()
export class UsersService {
	constructor(
		@inject(UsersRepository) protected usersRepository: UsersRepository,
	) {}
	
	async getUserById(userId: string): Promise<DbUser | null> {
		return this.usersRepository.getUserById(userId);
	}
	
	async getUserByFilter(userFilter: UserFilter): Promise<DbUser | null> {
		return this.usersRepository.getUserByFilter(userFilter);
	}
	
	async createUser(
		userData: CreateUserInputModel,
		passwordHash: string,
		passwordSalt: string,
		isConfirmedByDefault: boolean
	): Promise<string> {
		const {login, email} = userData;
		const newUser = new User(login, email, passwordSalt, passwordHash, isConfirmedByDefault);
		
		return this.usersRepository.createUser(newUser);
	}
	
	async updateUser(userId: string, updatedField: UpdateOrFilterModel): Promise<void> {
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
