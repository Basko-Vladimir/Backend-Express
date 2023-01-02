import {ObjectId} from "mongodb";

export interface DbComment {
	_id: ObjectId;
	content: string;
	postId: ObjectId;
	userId: ObjectId;
	userLogin: string;
	createdAt: Date;
}
