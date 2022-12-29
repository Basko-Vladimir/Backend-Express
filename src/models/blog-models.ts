import {QueryParamsModel} from "./common";

export interface BlogViewModel {
	id: string;
	name: string;
	youtubeUrl: string;
	createdAt: string;
}

export type CreateBlogModel = Omit<BlogViewModel, "id" | "createdAt">;
export type UpdateBlogModel = Omit<BlogViewModel, "id" | "createdAt">;

export interface BlogsQueryParamsModel extends QueryParamsModel {
	searchNameTerm?: string;
}
