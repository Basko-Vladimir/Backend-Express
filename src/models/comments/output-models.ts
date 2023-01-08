import {CommonQueryParamsModel} from "../common-models";
import {CommentSortByField} from "../../common/enums";

export interface CommentOutputModel {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
}

export interface CommentQueryParamsOutputModel extends CommonQueryParamsModel<CommentSortByField> {}
