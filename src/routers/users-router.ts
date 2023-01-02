import {Response, Router} from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {CreateUserInputModel, UsersQueryParamsInputModel} from "../models/users/input-models";
import {AllUsersOutputModel, UserOutputModel, UsersQueryParamsOutputModel} from "../models/users/output-models";
import {SortDirection, UserSortByField} from "../models/enums";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, EMPTY_SEARCH_VALUE} from "../common/constants";
import { queryUsersRepository } from "../repositories/users/query-users-repository";
import {usersService} from "../services/users-service";
import {ParamIdInputModel} from "../models/common-models";
import {checkAuthorization} from "../middlewares/check-authorization";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";

export const usersRouter = Router({});

usersRouter.get(
	"/",
	async (req: TypedRequestQuery<UsersQueryParamsInputModel>, res: Response<AllUsersOutputModel>) => {
		try{
			const { sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm } = req.query;
			const queryParamsData: UsersQueryParamsOutputModel = {
				sortBy: sortBy || UserSortByField.createdAt,
				sortDirection: sortDirection ? SortDirection[sortDirection] : SortDirection.desc,
				pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
				pageNumber: Number(pageNumber) || DEFAULT_PAGE_NUMBER,
				searchEmailTerm: searchEmailTerm || EMPTY_SEARCH_VALUE,
				searchLoginTerm: searchLoginTerm || EMPTY_SEARCH_VALUE
			};
			const usersOutputModel = await queryUsersRepository.getAllUsers(queryParamsData);
			res.status(200).send(usersOutputModel);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

usersRouter.post(
	"/",
	checkAuthorization,
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
	checkAuthorization,
	requestErrorsValidation,
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response) => {
		try {
			await usersService.deleteUser(req.params.id);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

