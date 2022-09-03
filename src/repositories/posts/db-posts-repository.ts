import { DeleteResult } from "mongodb";
import {IPost, IPostData} from "../../interfaces/posts-interfaces";
import { bloggersRepository } from "../bloggers/db-bloggers-repository";
import {postsCollection} from "../db";

export const postsRepository = {
	async getAllPosts(): Promise<IPost[]> {
		return postsCollection.find({}).toArray();
	},
	async getPostById(id: string): Promise<IPost | null>  {
		return postsCollection.findOne({id});
	},
	async deletePost(id: string): Promise<boolean> {
		const { deletedCount } = await postsCollection.deleteOne({id});
		return Boolean(deletedCount);
	},
	async deleteAllPosts(): Promise<void> {
		await postsCollection.deleteMany({});
		return
	},
	async createPost(postData: IPostData): Promise<IPost> {
		const { shortDescription, content, title, bloggerId } = postData;
		const blogger = await bloggersRepository.getBloggerById(bloggerId);
		const newPost: IPost = {
			id: String(Date.now()),
			bloggerName: blogger?.name || "",
			createdAt: new Date().toISOString(),
			shortDescription,
			content,
			title,
			bloggerId
		};
		
		await postsCollection.insertOne(newPost);
		return newPost;
	},
	async updatePost(id: string, postData: IPostData): Promise<boolean> {
		const { shortDescription, content, title, bloggerId } = postData;
		
		const { matchedCount } = await postsCollection.updateOne({id}, {$set: {shortDescription, content, title, bloggerId}});
		return Boolean(matchedCount);
	}
}