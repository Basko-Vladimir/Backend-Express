import {SortDirection, UserSortByField} from "../enums";
import {AllEntitiesOutputModel} from "../common-models";

export interface UserOutputModel {
	id: string;
	login: string;
	email: string;
	createdAt: string;
}

export type AllUsersOutputModel = AllEntitiesOutputModel<UserOutputModel>;

export interface UsersQueryParamsOutputModel {
	sortBy: UserSortByField;
	sortDirection: SortDirection;
	pageNumber: number;
	pageSize: number;
	searchLoginTerm: string;
	searchEmailTerm: string;
}
