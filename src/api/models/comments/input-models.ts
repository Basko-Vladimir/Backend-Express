import {ParamsDictionary} from "express-serve-static-core";
import {IComment} from "../../../domain/comments/CommentTypes";

export interface CreateCommentInputModel {
	content: string;
}

export interface ParamCommentIdInputModel extends ParamsDictionary {
	commentId: string;
}

export type CommentDataDTO = Pick<IComment, "content" |  "userId" | "userLogin" | "postId">;
