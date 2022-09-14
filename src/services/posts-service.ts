import {ObjectId} from "mongodb";
import { Post } from "../classes/posts";
import { postsRepository } from "../repositories/posts/posts-repository";
import {PostOutputModel} from "../models/posts/output-models";

export const postsService = {
	async createPost(
		postData: Omit<PostOutputModel, "id" | "createdAt">,
	): Promise<string> {
		const { title, content, shortDescription, blogId, blogName } = postData;
		const newPostData = new Post({
			title,
			content,
			shortDescription,
			blogName,
			blogId: new ObjectId(blogId)
		});

		return await postsRepository.createPost(newPostData);
	},

	async updatePost(postData: Omit<PostOutputModel, "blogName" | "createdAt">): Promise<void> {
		return postsRepository.updatePost(postData);
	},

	async deletePost(id: string): Promise<void> {
		return postsRepository.deletePost(id);
	},

	async deleteAllPosts(): Promise<void> {
		return postsRepository.deleteAllPosts();
	}
};
