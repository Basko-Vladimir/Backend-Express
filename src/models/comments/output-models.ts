import {CommentSortByField} from "../../common/enums";
import {CommonQueryParamsModel} from "../common-models";

export interface CommentOutputModel {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
}

export interface CommentQueryParamsOutputModel extends CommonQueryParamsModel<CommentSortByField> {}
