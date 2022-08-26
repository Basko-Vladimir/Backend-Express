import {IPost, IPostData} from "../interfaces/posts-interfaces";
import { bloggersRepository } from "./bloggers-repository";

let posts: IPost[] = [];

export const postsRepository = {
	getAllPosts() {
		return posts;
	},
	getPostById(id: string) {
		return posts.find(item => item.id === id);
	},
	deletePost(id: string) {
		const post = posts.find(item => item.id === id);
		
		if (!post) {
			return false;
		} else {
			posts = posts.filter(item => item.id !== id);
			return true;
		}
	},
	deleteAllPosts() {
		posts = [];
	},
	createPost(postData: IPostData) {
		const { shortDescription, content, title, bloggerId } = postData;
		const bloggerName = bloggersRepository.getBloggerById(bloggerId)?.name;
		const newPost: IPost = {
			id: String(Date.now()),
			bloggerName: bloggerName || "",
			shortDescription,
			content,
			title,
			bloggerId
		};
		
		posts.push(newPost);
		
		return newPost;
	},
	updatePost(postId: string, postData: IPostData) {
		const { shortDescription, content, title, bloggerId } = postData;
		
		posts = posts.map(item => item.id === postId
			? {...item, shortDescription, content, title, bloggerId}
			: item
		);
		
		return posts.find(item => item.id === postId);
	}
}