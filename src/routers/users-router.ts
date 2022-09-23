import {Response, Router} from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {CreateUserInputModel} from "../models/users/input-models";
import {AllUsersOutputModel, UserOutputModel, UsersQueryParamsOutputModel} from "../models/users/output-models";
import {EMPTY_SEARCH_VALUE} from "../common/constants";
import { queryUsersRepository } from "../repositories/users/query-users-repository";
import {usersService} from "../services/users-service";
import {ParamIdInputModel} from "../models/common-models";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";

export const usersRouter = Router({});

usersRouter.get(
	"/",
	commonQueryParamsSanitization,
	async (req: TypedRequestQuery<UsersQueryParamsOutputModel>, res: Response<AllUsersOutputModel>) => {
		try{
			const {  searchLoginTerm, searchEmailTerm } = req.query;
			const usersOutputModel = await queryUsersRepository.getAllUsers({
				...req.query,
				searchLoginTerm: searchLoginTerm ? searchLoginTerm.trim() : EMPTY_SEARCH_VALUE,
				searchEmailTerm: searchLoginTerm ? searchEmailTerm.trim() : EMPTY_SEARCH_VALUE
			});
			res.status(200).send(usersOutputModel);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

usersRouter.post(
	"/",
	basicAuthValidation,
	userRequestBodyValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<CreateUserInputModel>, res: Response<UserOutputModel>) => {
		try {
			const createdUserId = await usersService.createUser(req.body);
			const user = await queryUsersRepository.getUserById(createdUserId);
			res.status(201).send(user);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

usersRouter.delete(
	"/:id",
	basicAuthValidation,
	requestErrorsValidation,
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response) => {
		try {
			await usersService.deleteUser(req.params.id);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});
