import {CommonQueryParamsModel} from "../common-models";
import {CommentSortByField} from "../../common/enums";
import {LikesInfo} from "../../classes/comments";

export interface CommentOutputModel {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
	likesInfo: LikesInfo;
}

export interface CommentQueryParamsOutputModel extends CommonQueryParamsModel<CommentSortByField> {}
