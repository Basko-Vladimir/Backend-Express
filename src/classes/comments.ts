import {ObjectId} from "mongodb";
import {LikeStatus} from "../common/enums";

export interface LikesInfo {
	likesCount: number;
	dislikesCount: number;
	myStatus: LikeStatus
}

export class Comment {
	content: string;
	postId: ObjectId;
	userId: ObjectId;
	userLogin: string;
	likesInfo: LikesInfo;
	createdAt: Date;
	
	constructor(content: string, userLogin: string, userId: ObjectId, postId: ObjectId) {
		this.content = content;
		this.postId = postId;
		this.userId = userId;
		this.userLogin = userLogin;
		this.createdAt = new Date();
		this.likesInfo = {
			likesCount: 0,
			dislikesCount: 0,
			myStatus: LikeStatus.NONE
		}
	}
}

export type CommentDataDTO = Pick<Comment, "content" |  "userId" | "userLogin" | "postId">;
