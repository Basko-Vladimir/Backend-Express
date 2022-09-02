import {IPost, IPostData} from "../../interfaces/posts-interfaces";
import { memoryBloggersRepository } from "../bloggers/memory-bloggers-repository";

let posts: IPost[] = [];

export const memoryPostsRepository = {
	getAllPosts() {
		return posts;
	},
	getPostById(id: number) {
		return posts.find(item => item.id === id);
	},
	deletePost(id: number) {
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
		const bloggerName = memoryBloggersRepository.getBloggerById(bloggerId)?.name;
		const newPost: IPost = {
			id: Date.now(),
			bloggerName: bloggerName || "",
			shortDescription,
			content,
			title,
			bloggerId
		};
		
		posts.push(newPost);
		
		return newPost;
	},
	updatePost(postId: number, postData: IPostData) {
		const { shortDescription, content, title, bloggerId } = postData;
		
		posts = posts.map(item => item.id === postId
			? {...item, shortDescription, content, title, bloggerId}
			: item
		);
		
		return posts.find(item => item.id === postId);
	}
}