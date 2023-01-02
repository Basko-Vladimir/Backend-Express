import {ObjectId} from "mongodb";

export class Comment {
	_id: ObjectId | null = null;
	content: string;
	postId: ObjectId;
	userId: ObjectId;
	userLogin: string;
	createdAt: Date;
	
	constructor(content: string, userLogin: string, userId: string, postId: string) {
		this.content = content;
		this.postId = new ObjectId(postId);
		this.userId = new ObjectId(userId);
		this.userLogin = userLogin;
		this.createdAt = new Date();
	}
}
