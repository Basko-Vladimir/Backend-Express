import {SortDirection, UserSortByField} from "../enums";

export interface CreateUserInputModel {
	login: string;
	password: string;
	email: string;
}

export interface UsersQueryParamsInputModel {
	sortBy?: UserSortByField;
	sortDirection?: SortDirection;
	pageNumber?: string;
	pageSize?: string;
	searchLoginTerm?: string;
	searchEmailTerm?: string;
}
