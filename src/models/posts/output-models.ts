import {PostSortByField, SortDirection} from "../enums";

export interface PostOutputModel {
	id: string;
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
	createdAt: string;
}

export interface PostsQueryParamsOutputModel {
	sortBy: PostSortByField;
	sortDirection: SortDirection;
	pageNumber: number;
	pageSize: number;
}