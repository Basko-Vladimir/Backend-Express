import {UserSortByField} from "../../common/enums";
import {AllEntitiesOutputModel, CommonQueryParamsModel} from "../common-models";

export interface UserOutputModel {
	id: string;
	login: string;
	email: string;
	createdAt: string;
}

export type AllUsersOutputModel = AllEntitiesOutputModel<UserOutputModel>;

export interface UsersQueryParamsOutputModel extends CommonQueryParamsModel<UserSortByField> {
	searchLoginTerm: string;
	searchEmailTerm: string;
}
