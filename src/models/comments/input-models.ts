import {ParamsDictionary} from "express-serve-static-core";

export interface CreateCommentInputModel {
	content: string;
}

export interface ParamCommentIdInputModel extends ParamsDictionary {
	commentId: string;
}
