import {PostOutputModel} from "../posts/output-models";
import {BlogSortByField} from "../enums";
import {AllEntitiesOutputModel, CommonQueryParamsModel} from "../common-models";

export interface BlogOutputModel {
	id: string;
	name: string;
	websiteUrl: string;
	createdAt: string;
}

export interface AllBlogsOutputModel {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: BlogOutputModel[];
}

export interface BlogAllPostsOutputModel extends AllEntitiesOutputModel<PostOutputModel> {}

export interface BlogsQueryParamsOutputModel extends CommonQueryParamsModel<BlogSortByField> {
	searchNameTerm: string;
}
