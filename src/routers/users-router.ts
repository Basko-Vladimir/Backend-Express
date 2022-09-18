import {Response, Router} from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestQuery} from "../common/interfaces";
import {UsersQueryParamsInputModel} from "../models/users/input-models";
import {AllUsersOutputModel, UsersQueryParamsOutputModel} from "../models/users/output-models";
import {SortDirection, UserSortByField} from "../models/enums";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, EMPTY_SEARCH_VALUE} from "../common/constants";
import { queryUsersRepository } from "../repositories/users/query-users-repository";

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
