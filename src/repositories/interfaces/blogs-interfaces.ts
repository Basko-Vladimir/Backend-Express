import {ObjectId} from "mongodb";

export interface DbBlog {
	_id: ObjectId;
	name: string;
	websiteUrl: string;
	description: string;
	createdAt: Date;
	__v: number;
}
