import {ObjectId} from "mongodb";

export class Comment {
	content: string;
	postId: ObjectId;
	userId: ObjectId;
	userLogin: string;
	createdAt: Date;
	
	constructor(content: string, userLogin: string, userId: ObjectId, postId: ObjectId) {
		this.content = content;
		this.postId = postId;
		this.userId = userId;
		this.userLogin = userLogin;
		this.createdAt = new Date();
	}
}
