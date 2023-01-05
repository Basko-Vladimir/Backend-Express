import {injectable} from "inversify";
import {UsersModel} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DbUser, UserFilter} from "../interfaces/users-interfaces";
import { User } from "../../classes/users";
import {EntityWithoutId, UpdateOrFilterModel} from "../../common/interfaces";
import {DataBaseError, NotFoundError} from "../../classes/errors";

@injectable()
export class UsersRepository {
	async getUserById(id: string): Promise<DbUser | null> {
		return UsersModel.findById(id);
	}
	
	async createUser(userData: EntityWithoutId<User>): Promise<string> {
		const createdUser = await UsersModel.create(userData);
		
		if (!createdUser) throw new DataBaseError();
		
		return String(createdUser._id);
	}
	
	async updateUser(userId: string, updatedField: UpdateOrFilterModel): Promise<void> {
		const { matchedCount } = await UsersModel.updateOne(
			getFilterByDbId(userId),
			updatedField
		);
		
		if (!matchedCount) throw new DataBaseError();
	}
	
	async getUserByFilter(userFilter: UserFilter): Promise<DbUser | null> {
		const filter = Object.keys(userFilter)
			.map(field => ({ [field]: userFilter[field as keyof UserFilter] }));
		
		return UsersModel.findOne({ $or: filter });
	}
	
	async deleteUser(id: string): Promise<void> {
		const { deletedCount } = await UsersModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllUsers(): Promise<void> {
		await UsersModel.deleteMany({});
	}
	
	async updateUserConfirmation(user: User): Promise<void> {
		const {matchedCount} = await UsersModel.updateOne(
			{"emailConfirmation.confirmationCode": user.emailConfirmation.confirmationCode},
			{"emailConfirmation.isConfirmed": true}
		);
		
		if (!matchedCount) throw new DataBaseError();
	}
}
