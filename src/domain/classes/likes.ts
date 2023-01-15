import {ObjectId} from "mongodb";
import {LikeStatus} from "../../common/enums";

export class Like {
	userId: ObjectId;
	commentId: ObjectId;
	status: LikeStatus;
	
	constructor(userId: ObjectId, commentId: ObjectId, status?: LikeStatus) {
		this.userId = userId;
		this.commentId = commentId;
		this.status = status || LikeStatus.NONE;
	}
}
