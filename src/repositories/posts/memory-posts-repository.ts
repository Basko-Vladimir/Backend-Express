import {IPost, IPostData} from "../../interfaces/posts-interfaces";
import { bloggersRepository } from "../bloggers/bloggers-repository";

let posts: IPost[] = [];

export const postsRepository = {
	async getAllPosts(): Promise<IPost[]> {
		return posts;
	},
	async getPostById(id: number): Promise<IPost | undefined>  {
		return posts.find(item => item.id === id);
	},
	async deletePost(id: number): Promise<boolean> {
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
			id: Date.now(),
			bloggerName: blogger?.name || "",
			shortDescription,
			content,
			title,
			bloggerId
		};
		
		posts.push(newPost);
		
		return newPost;
	},
	async updatePost(postId: number, postData: IPostData): Promise<IPost | undefined> {
		const { shortDescription, content, title, bloggerId } = postData;
		
		posts = posts.map(item => item.id === postId
			? {...item, shortDescription, content, title, bloggerId}
			: item
		);
		
		return posts.find(item => item.id === postId);
	}
}