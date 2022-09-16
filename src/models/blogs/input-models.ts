import {ParamsDictionary} from "express-serve-static-core";
import {BlogSortByField, SortDirection} from "../enums";

export interface CreateBlogInputModel {
	name: string;
	youtubeUrl: string;
}

export interface UpdateBlogInputModel {
	name: string;
	youtubeUrl: string;
}

export interface CreateBlogPostInputModel {
	title: string;
	shortDescription: string;
	content: string;
}

export interface ParamBlogIdInputModel extends ParamsDictionary {
	blogId: string;
}

export interface BlogsQueryParamsInputModel {
	sortBy?: BlogSortByField;
	sortDirection?: SortDirection;
	pageNumber?: string;
	pageSize?: string;
	searchNameTerm?: string;
}
