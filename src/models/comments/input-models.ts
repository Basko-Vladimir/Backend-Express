import {ParamsDictionary} from "express-serve-static-core";
import {LikeStatus} from "../../common/enums";

export interface CreateCommentInputModel {
	content: string;
}

export interface UpdateLikeStatusInputModel {
	likeStatus: LikeStatus;
}

export interface ParamCommentIdInputModel extends ParamsDictionary {
	commentId: string;
}
