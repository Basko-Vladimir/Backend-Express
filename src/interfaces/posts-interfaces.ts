import {IBaseEntity} from "./common";

export interface IPostData {
	shortDescription: string;
	content: string;
	bloggerId: number;
	title: string;
}

export interface IPost extends IPostData, IBaseEntity {
	bloggerName: string;
}