import {inject, injectable} from "inversify";
import {Response} from "express";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../../common/interfaces";
import {AllUsersOutputModel, UserOutputModel, UsersQueryParamsOutputModel} from "../models/users/output-models";
import {QueryUsersRepository} from "../../infrastructure/repositories/users/query-users-repository";
import {EMPTY_SEARCH_VALUE} from "../../common/constants";
import {getErrorStatus} from "./utils";
import {CreateUserInputModel} from "../models/users/input-models";
import {UsersService} from "../../application/services/users-service";
import {ParamIdInputModel} from "../models/common-models";
import {AuthService} from "../../application/services/auth-service";

@injectable()
export class UsersController {
	constructor(
		@inject(AuthService) protected authService: AuthService,
		@inject(UsersService) protected usersService: UsersService,
		@inject(QueryUsersRepository) protected queryUsersRepository: QueryUsersRepository
	) {}
	
	async getAllUsers(req: TypedRequestQuery<UsersQueryParamsOutputModel>, res: Response<AllUsersOutputModel>) {
		try {
			const {searchLoginTerm, searchEmailTerm} = req.query;
			const usersOutputModel = await this.queryUsersRepository.getAllUsers({
				...req.query,
				searchLoginTerm: searchLoginTerm ? searchLoginTerm.trim() : EMPTY_SEARCH_VALUE,
				searchEmailTerm: searchEmailTerm ? searchEmailTerm.trim() : EMPTY_SEARCH_VALUE
			});
			res.status(200).send(usersOutputModel);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async createUser(req: TypedRequestBody<CreateUserInputModel>, res: Response<UserOutputModel>) {
		try {
			const createdUserId = await this.authService.registerUser(req.body, true);
			const user = await this.queryUsersRepository.getUserById(createdUserId);
			res.status(201).send(user);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async deleteUser(req: TypedRequestParams<ParamIdInputModel>, res: Response) {
		try {
			await this.usersService.deleteUser(req.params.id);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}