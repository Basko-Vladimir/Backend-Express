import {injectable} from "inversify";
import {getFilterByDbId} from "../utils/mappers-utils";
import {UserFilter} from "../interfaces/users-interfaces";
import { NotFoundError } from "../../../common/errors/errors-types";
import {IUser, UserModel} from "../../../domain/users/UserTypes";

@injectable()
export class UsersRepository {
	async getUserById(id: string): Promise<IUser | null> {
		return UserModel.findById(id);
	}
	
	async save(user: IUser): Promise<IUser> {
		return user.save();
	}
	
	async getUserByFilter(userFilter: UserFilter): Promise<IUser | null> {
		const filter = Object.keys(userFilter)
			.map(field => ({ [field]: userFilter[field as keyof UserFilter] }));
		
		return UserModel.findOne({ $or: filter });
	}
	
	async deleteUser(id: string): Promise<void> {
		const { deletedCount } = await UserModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllUsers(): Promise<void> {
		await UserModel.deleteMany({});
	}
}
