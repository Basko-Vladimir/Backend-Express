import {ObjectId} from "mongodb";
import {SortByField} from "../interfaces/enums";

export enum SortDirection {
	desc = -1,
	asc = 1
}

export type SortSetting = {
	[key in SortByField]?: SortDirection
}

export interface DbBlog {
	_id: ObjectId;
	name: string;
	youtubeUrl: string;
	createdAt: Date;
}

export interface DbPost {
	_id: ObjectId;
	title: string;
	shortDescription: string;
	content: string;
	blogId: ObjectId;
	blogName: string;
	createdAt: Date;
}