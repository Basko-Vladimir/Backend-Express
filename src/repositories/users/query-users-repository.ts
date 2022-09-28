import {usersCollection} from "../db";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {getFilterByDbId, mapDbUserToUserOutputModel} from "../utils/mappers-utils";
import {AllUsersOutputModel, UserOutputModel, UsersQueryParamsOutputModel} from "../../models/users/output-models";
import {NotFoundError} from "../../classes/errors";

class QueryUsersRepository {
	async getAllUsers(queryParamsData: UsersQueryParamsOutputModel ): Promise<AllUsersOutputModel> {
		const { sortBy, sortDirection, pageNumber, pageSize, searchEmailTerm, searchLoginTerm } = queryParamsData;
		const skip = countSkipValue(pageNumber, pageSize);
		const sortSetting = setSortValue(sortBy, sortDirection);
		
		const searchFilter = {$or: [
				{login: {$regex: searchLoginTerm, $options: "i"}},
				{email: {$regex: searchEmailTerm, $options: "i"}}
			]};
		const totalCount =  await usersCollection.countDocuments(searchFilter);
		const users = await usersCollection
			.find(searchFilter)
			.skip(skip)
			.limit(pageSize)
			.sort(sortSetting)
			.toArray();
		
		return {
			pagesCount: Math.ceil(totalCount / pageSize),
			page: pageNumber,
			pageSize: pageSize,
			totalCount,
			items: users.map(mapDbUserToUserOutputModel)
		};
	}
	
	async getUserById(id: string): Promise<UserOutputModel> {
		const user = await usersCollection.findOne(getFilterByDbId(id));
		
		if (!user) throw new NotFoundError();
		
		return mapDbUserToUserOutputModel(user);
	}
}

export const queryUsersRepository = new QueryUsersRepository();
