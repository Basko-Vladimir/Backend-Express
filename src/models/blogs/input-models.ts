import {ParamsDictionary} from "express-serve-static-core";

export interface CreateBlogInputModel {
	name: string;
	websiteUrl: string;
	description: string;
}

export interface UpdateBlogInputModel {
	name: string;
	websiteUrl: string;
	description: string;
}

export interface CreateBlogPostInputModel {
	title: string;
	shortDescription: string;
	content: string;
}

export interface ParamBlogIdInputModel extends ParamsDictionary {
	blogId: string;
}
