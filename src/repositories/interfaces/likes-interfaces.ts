import {ObjectId} from "mongodb";
import {LikeStatus} from "../../common/enums";

export interface DbLike {
	_id: ObjectId;
	userId: ObjectId;
	commentId: ObjectId;
	status: LikeStatus;
	__v: number;
}
