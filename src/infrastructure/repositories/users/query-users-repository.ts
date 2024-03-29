import {injectable} from "inversify";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbUserToUserOutputModel} from "../utils/mappers-utils";
import {AllUsersOutputModel, UserOutputModel, UsersQueryParamsOutputModel} from "../../../api/models/users/output-models";
import { NotFoundError } from "../../../common/errors/errors-types";
import {UserModel} from "../../../domain/users/UserTypes";

@injectable()
export class QueryUsersRepository {
	async getAllUsers(queryParamsData: UsersQueryParamsOutputModel ): Promise<AllUsersOutputModel> {
		const { sortBy, sortDirection, pageNumber, pageSize, searchEmailTerm, searchLoginTerm } = queryParamsData;
		const skip = countSkipValue(pageNumber, pageSize);
		const sortSetting = setSortValue(sortBy, sortDirection);

		const totalCount =  await UserModel
			.countDocuments()
			.where("email", new RegExp(searchEmailTerm, "i"))
			.where("login", new RegExp(searchLoginTerm, "i"));
		const users = await UserModel
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
		const user = await UserModel.findById(id);
		
		if (!user) throw new NotFoundError();
		
		return mapDbUserToUserOutputModel(user);
	}
}
