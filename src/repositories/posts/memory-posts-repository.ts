import {IPost, IPostData} from "../../interfaces/posts-interfaces";
import { bloggersRepository } from "../bloggers/db-bloggers-repository";

let posts: IPost[] = [];

export const postsRepository = {
	async getAllPosts(): Promise<IPost[]> {
		return posts;
	},
	async getPostById(id: string): Promise<IPost | null>  {
		return posts.find(item => item.id === id) || null;
	},
	async deletePost(id: string): Promise<boolean> {
		const post = posts.find(item => item.id === id);
		
		if (!post) {
			return false;
		} else {
			posts = posts.filter(item => item.id !== id);
			return true;
		}
	},
	async deleteAllPosts(): Promise<void> {
		posts = [];
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
		
		posts.push(newPost);
		
		return newPost;
	},
	async updatePost(id: string, postData: IPostData): Promise<boolean> {
		const { shortDescription, content, title, bloggerId } = postData;
		
		posts = posts.map(item => item.id === id
			? {...item, shortDescription, content, title, bloggerId}
			: item
		);
		
		return Boolean(posts.find(item => item.id === id));
	}
}