import {ObjectId} from "mongodb";

export interface DbBlog {
	_id: ObjectId;
	name: string;
	youtubeUrl: string;
	createdAt: Date;
}
