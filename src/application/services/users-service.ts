import {inject, injectable} from "inversify";
import {UsersRepository} from "../../infrastructure/repositories/users/users-repository";
import {CreateUserInputModel} from "../../api/models/users/input-models";
import {UserFilter} from "../../infrastructure/repositories/interfaces/users-interfaces";
import {IUser, UserModel} from "../../domain/users/UserTypes";
import {NotFoundError} from "../../common/errors/errors-types";

@injectable()
export class UsersService {
	constructor(
		@inject(UsersRepository) protected usersRepository: UsersRepository,
	) {}
	
	async getUserById(userId: string): Promise<IUser | null> {
		return this.usersRepository.getUserById(userId);
	}
	
	async getUserByFilter(userFilter: UserFilter): Promise<IUser | null> {
		return this.usersRepository.getUserByFilter(userFilter);
	}
	
	async createUser(
		userData: CreateUserInputModel,
		passwordHash: string,
		passwordSalt: string,
		isConfirmedByDefault: boolean
	): Promise<string> {
		const {login, email} = userData;
		
		const createdUser = await UserModel.createUserEntity(
			login,
			email,
			passwordSalt,
			passwordHash,
			isConfirmedByDefault
		);
		const savedUser = await this.usersRepository.save(createdUser);
		
		return String(savedUser._id);
	}
	
	async deleteUser(id: string): Promise<void> {
		return this.usersRepository.deleteUser(id);
	}
	
	async deleteAllUsers(): Promise<void> {
		return this.usersRepository.deleteAllUsers();
	}
	
	async confirmRegistration(user: IUser): Promise<void> {
		const confirmedUser = user.confirmUserRegistration();
		await this.usersRepository.save(confirmedUser);
	}
	
	async updateConfirmationCode(user: IUser): Promise<IUser> {
		const updatedUser = user.updateConfirmationCode();
		return this.usersRepository.save(updatedUser);
	}
	
	async updatePasswordRecoveryCode(email: string): Promise<IUser> {
		const targetUser = await this.getUserByFilter({email});
		
		if (!targetUser) throw new NotFoundError();
		
		const updatedTargetUser = targetUser.updatePasswordRecoveryCode();
		return this.usersRepository.save(updatedTargetUser);
	}
	
	async updateUserPassword(user: IUser, passwordHash: string, recoveryCode: string): Promise<void> {
		const updatedUser = user.updateUserPassword(passwordHash, recoveryCode);
		await this.usersRepository.save(updatedUser);
	}
}
