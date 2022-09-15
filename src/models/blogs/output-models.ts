import {PostOutputModel} from "../posts/output-models";

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

export interface BlogAllPostsOutputModel {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: PostOutputModel[];
}
