import {ObjectId} from "mongodb";
import {LikesInfo} from "../../classes/comments";

export interface DbComment {
	_id: ObjectId;
	content: string;
	postId: ObjectId;
	userId: ObjectId;
	userLogin: string;
	likesInfo: LikesInfo;
	createdAt: Date;
	__v: number;
}
