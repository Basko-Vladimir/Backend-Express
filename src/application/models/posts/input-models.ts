import {ParamsDictionary} from "express-serve-static-core";

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

export interface ParamPostIdInputModel extends ParamsDictionary {
	postId: string;
}
