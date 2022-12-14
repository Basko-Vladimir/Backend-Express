import {ObjectId} from "mongodb";
import {inject, injectable} from "inversify";
import {CommentsService} from "./comments-service";
import {LikesService} from "./likes-service";
import {Post} from "../classes/posts";
import {CommentDataDTO} from "../classes/comments";
import {PostsRepository} from "../repositories/posts/posts-repository";
import {DbPost} from "../repositories/interfaces/posts-interfaces";
import {PostOutputModel} from "../models/posts/output-models";
import {UpdatePostInputModel} from "../models/posts/input-models";

@injectable()
export class PostsService {
	constructor(
		@inject(PostsRepository) protected postsRepository: PostsRepository,
		@inject(CommentsService) protected commentsService: CommentsService,
		@inject(LikesService) protected likesService: LikesService
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
	
	async updatePost(id: string, postData: UpdatePostInputModel): Promise<void> {
		return this.postsRepository.updatePost(id, postData);
	}
	
	async deletePost(id: string): Promise<void> {
		return this.postsRepository.deletePost(id);
	}
	
	async deleteAllPosts(): Promise<void> {
		return this.postsRepository.deleteAllPosts();
	}
	
	async createCommentByPostId(commentData: CommentDataDTO): Promise<string> {
		const commentId = await this.commentsService.createComment(commentData);
		
		await this.likesService.createLike(String(commentData.userId), commentId);
		
		return commentId;
	}
}
