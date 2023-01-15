import {ObjectId} from "mongodb";

export class Post {
	title: string;
	shortDescription: string;
	content: string;
	blogId: ObjectId;
	blogName: string;
	createdAt: Date;
	
	constructor ({
	 title, content, blogId, blogName, shortDescription}: Omit<Post, "createdAt">
	) {
			this.title = title;
			this.content = content;
			this.shortDescription = shortDescription;
			this.blogName = blogName;
			this.blogId = blogId;
			this.createdAt = new Date();
		}
}
