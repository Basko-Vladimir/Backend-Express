import {ParamsDictionary} from "express-serve-static-core";

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
