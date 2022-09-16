import {PostSortByField, SortDirection} from "../enums";

export interface CreatePostInputModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
}

export interface UpdatePostInputModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
}

export interface PostsQueryParamsInputModel {
	sortBy?: PostSortByField;
	sortDirection?: SortDirection;
	pageNumber?: string;
	pageSize?: string;
}