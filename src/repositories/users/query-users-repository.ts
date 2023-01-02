import {injectable} from "inversify";
import {UsersModel} from "../db";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbUserToUserOutputModel} from "../utils/mappers-utils";
import {AllUsersOutputModel, UserOutputModel, UsersQueryParamsOutputModel} from "../../models/users/output-models";
import {NotFoundError} from "../../classes/errors";

@injectable()
export class QueryUsersRepository {
	async getAllUsers(queryParamsData: UsersQueryParamsOutputModel ): Promise<AllUsersOutputModel> {
		const { sortBy, sortDirection, pageNumber, pageSize, searchEmailTerm, searchLoginTerm } = queryParamsData;
		const skip = countSkipValue(pageNumber, pageSize);
		const sortSetting = setSortValue(sortBy, sortDirection);

		const totalCount =  await UsersModel
			.countDocuments()
			.where("email", new RegExp(searchEmailTerm, "i"))
			.where("login", new RegExp(searchLoginTerm, "i"));
		const users = await UsersModel
			.find()
			.where("email", new RegExp(searchEmailTerm, "i"))
			.where("login", new RegExp(searchLoginTerm, "i"))
			.skip(skip)
			.limit(pageSize)
			.sort(sortSetting);
		
		return {
			pagesCount: Math.ceil(totalCount / pageSize),
			page: pageNumber,
			pageSize: pageSize,
			totalCount,
			items: users.map(mapDbUserToUserOutputModel)
		};
	}
	
	async getUserById(id: string): Promise<UserOutputModel> {
		const user = await UsersModel.findById(id);
		
		if (!user) throw new NotFoundError();
		
		return mapDbUserToUserOutputModel(user);
	}
}
