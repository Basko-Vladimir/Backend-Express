import {usersCollection} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {UserFilter} from "../interfaces/users-interfaces";
import { User } from "../../classes/users";
import {EntityWithoutId} from "../../common/interfaces";
import {DataBaseError, NotFoundError} from "../../classes/errors";

export class UsersRepository {
	async getUserById(id: string): Promise<User | null> {
		return usersCollection.findOne(getFilterByDbId(id));
	}
	
	async createUser(userData: EntityWithoutId<User>): Promise<string> {
		const { insertedId } = await usersCollection.insertOne(userData);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	}
	
	async updateUser(userId: string, updatedField: {[key: string]: unknown}): Promise<void> {
		const { matchedCount } = await usersCollection.updateOne(getFilterByDbId(userId), {$set: updatedField});
		
		if (!matchedCount) throw new DataBaseError();
	}
	
	async getUserByFilter(userFilter: UserFilter): Promise<User | null> {
		return usersCollection.findOne({ $or: [
				{email: userFilter.email},
				{login: userFilter.login},
				{passwordHash: userFilter.passwordHash},
				{"emailConfirmation.confirmationCode": userFilter.confirmationCode }
			]
		});
	}
	
	async deleteUser(id: string): Promise<void> {
		const { deletedCount } = await usersCollection.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllUsers(): Promise<void> {
		await usersCollection.deleteMany({});
	}
	
	async updateUserConfirmation(user: User): Promise<void> {
		const {matchedCount} = await usersCollection.updateOne(
			{"emailConfirmation.confirmationCode": user.emailConfirmation.confirmationCode},
			{$set: {"emailConfirmation.isConfirmed": true}}
		);
		
		if (!matchedCount) throw new DataBaseError();
	}
}
