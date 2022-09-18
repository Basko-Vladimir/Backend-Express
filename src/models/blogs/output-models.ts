import {PostOutputModel} from "../posts/output-models";
import {BlogSortByField, SortDirection} from "../enums";
import {AllEntitiesOutputModel} from "../common-models";

export interface BlogOutputModel {
	id: string;
	name: string;
	youtubeUrl: string;
	createdAt: string;
}

export interface AllBlogsOutputModel {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: BlogOutputModel[];
}

export type BlogAllPostsOutputModel = AllEntitiesOutputModel<PostOutputModel>;

export interface BlogsQueryParamsOutputModel {
	sortBy: BlogSortByField;
	sortDirection: SortDirection;
	pageNumber: number;
	pageSize: number;
	searchNameTerm: string;
}
