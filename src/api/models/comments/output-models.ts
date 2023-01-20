import {CommonQueryParamsModel} from "../common-models";
import {CommentSortByField, LikeStatus} from "../../../common/enums";

export interface CommentOutputModel {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
}

export interface FullCommentOutputModel extends CommentOutputModel{
	likesInfo: {
		likesCount: number;
		dislikesCount: number;
		myStatus: LikeStatus
	};
}

export interface CommentQueryParamsOutputModel extends CommonQueryParamsModel<CommentSortByField> {}
