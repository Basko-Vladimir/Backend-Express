import {ObjectId} from "mongodb";
import {inject, injectable} from "inversify";
import {Post} from "../classes/posts";
import {PostsRepository} from "../repositories/posts/posts-repository";
import {DbPost} from "../repositories/interfaces/posts-interfaces";
import {PostOutputModel} from "../models/posts/output-models";
import {CommentOutputModel} from "../models/comments/output-models";
import {CommentsService} from "./comments-service";

@injectable()
export class PostsService {
	constructor(
		@inject(PostsRepository) protected postsRepository: PostsRepository,
		@inject(CommentsService) protected commentsService: CommentsService
	) {
	}
	
	async getPostById(id: string): Promise<DbPost | null> {
		return this.postsRepository.getPostById(id);
	}
	
	async createPost(
		postData: Omit<PostOutputModel, "id" | "createdAt">,
	): Promise<string> {
		const {title, content, shortDescription, blogId, blogName} = postData;
		const newPostData = new Post({
			title,
			content,
			shortDescription,
			blogName,
			blogId: new ObjectId(blogId)
		});
		
		return await this.postsRepository.createPost(newPostData);
	}
	
	async updatePost(postData: Omit<PostOutputModel, "blogName" | "createdAt">): Promise<void> {
		return this.postsRepository.updatePost(postData);
	}
	
	async deletePost(id: string): Promise<void> {
		return this.postsRepository.deletePost(id);
	}
	
	async deleteAllPosts(): Promise<void> {
		return this.postsRepository.deleteAllPosts();
	}
	
	async createCommentByPostId(
		postId: string,
		commentData: Omit<CommentOutputModel, "id" | "createdAt">
	): Promise<string> {
		return this.commentsService.createComment(postId, commentData);
	}
}
