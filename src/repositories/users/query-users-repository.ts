import {usersCollection} from "../db";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbUserToUserOutputModel} from "../utils/mappers-utils";
import {AllUsersOutputModel, UsersQueryParamsOutputModel} from "../../models/users/output-models";

export const queryUsersRepository = {
	async getAllUsers(queryParamsData: UsersQueryParamsOutputModel ): Promise<AllUsersOutputModel> {
		const { sortBy, sortDirection, pageNumber, pageSize, searchEmailTerm, searchLoginTerm } = queryParamsData;
		const skip = countSkipValue(pageNumber, pageSize);
		const sortSetting = setSortValue(sortBy, sortDirection);
		
		const searchFilter = {$and: [
			{login: {$regex: searchLoginTerm, $options: "i"}},
			{email: {$regex: searchEmailTerm, $options: "i"}}
		]}
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
};
