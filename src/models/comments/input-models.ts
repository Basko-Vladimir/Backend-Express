import {ParamsDictionary} from "express-serve-static-core";
import {CommentSortByField, SortDirection} from "../enums";

export interface CreateCommentInputModel {
	content: string;
}

export interface ParamCommentIdInputModel extends ParamsDictionary {
	commentId: string;
}

export interface CommentQueryParamsInputModel {
	sortBy?: CommentSortByField;
	sortDirection?: SortDirection;
	pageNumber?: string;
	pageSize?: string;
}
