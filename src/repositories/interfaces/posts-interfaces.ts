import {ObjectId} from "mongodb";

export interface DbPost {
	_id: ObjectId;
	title: string;
	shortDescription: string;
	content: string;
	blogId: ObjectId;
	blogName: string;
	createdAt: Date;
	__v: number;
}
