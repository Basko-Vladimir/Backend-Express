import {ObjectId} from "mongodb";

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