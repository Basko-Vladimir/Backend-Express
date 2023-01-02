import {CommentSortByField, SortDirection} from "../enums";

export interface CommentOutputModel {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
}


export interface CommentQueryParamsOutputModel {
	sortBy: CommentSortByField;
	sortDirection: SortDirection;
	pageNumber: number;
	pageSize: number;
}
