import {usersCollection} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import { User } from "../../classes/users";
import {EntityWithoutId} from "../../common/interfaces";
import {DataBaseError, NotFoundError} from "../../classes/errors";

export const usersRepository = {
	async createUser(userData: EntityWithoutId<User>): Promise<string> {
		const { insertedId } = await usersCollection.insertOne(userData);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	},
	
	async deleteUser(id: string): Promise<void> {
		const { deletedCount } = await usersCollection.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	},
	
	async deleteAllUsers(): Promise<void> {
		await usersCollection.deleteMany({});
	}
};
