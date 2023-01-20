import {inject, injectable} from "inversify";
import {LikesService} from "./likes-service";
import {PostsRepository} from "../../infrastructure/repositories/posts/posts-repository";
import {UpdatePostInputModel} from "../../api/models/posts/input-models";
import {IPost} from "../../domain/posts/PostTypes";
import {BlogsService} from "./blogs-service";
import {NotFoundError} from "../../common/errors/errors-types";
import {LikeStatus} from "../../common/enums";
import {CreateBlogPostInputModel} from "../../api/models/blogs/input-models";
import {CommentDataDTO} from "../../api/models/comments/input-models";
import {CommentsRepository} from "../../infrastructure/repositories/comments/comments-repository";
import {IUser} from "../../domain/users/UserTypes";

@injectable()
export class PostsService {
	constructor(
		@inject(PostsRepository) protected postsRepository: PostsRepository,
		@inject(CommentsRepository) protected commentsRepository: CommentsRepository,
		@inject(LikesService) protected likesService: LikesService,
		@inject(BlogsService) protected blogsService: BlogsService
	) {
	}
	
	async getPostById(id: string): Promise<IPost | null> {
		return this.postsRepository.getPostById(id);
	}
	
	async createPost(
		blogId: string,
		postData: CreateBlogPostInputModel
	): Promise<string> {
		return this.blogsService.createPostByBlogId(blogId, postData)
	}
	
	async updatePost(id: string, postData: UpdatePostInputModel): Promise<void> {
		const targetPost = await this.getPostById(id);
		
		if (!targetPost) throw new NotFoundError();
		
		const updatedPost = targetPost.updatePostData(postData);
		await this.postsRepository.save(updatedPost);
	}
	
	async deletePost(id: string): Promise<void> {
		return this.postsRepository.deletePost(id);
	}
	
	async deleteAllPosts(): Promise<void> {
		return this.postsRepository.deleteAllPosts();
	}
	
	async createCommentByPostId(commentData: CommentDataDTO): Promise<string> {
		const targetPost = await this.getPostById(String(commentData.postId));
		
		if (!targetPost) throw new NotFoundError();
		
		const createdComment = targetPost.createComment(commentData);
		const savedComment = await this.commentsRepository.save(createdComment);
		
		return String(savedComment._id);
	}
	
	async updatePostLikeStatus(user: IUser, postId: string, newStatus: LikeStatus): Promise<void> {
		const existingLike = await this.likesService.getLikeByFilter({userId: user._id, postId, commentId: null});
		
		if (existingLike) {
			return this.likesService.updateLike(String(existingLike._id), newStatus);
		} else {
			await this.likesService.createLike(user, postId, newStatus);
		}
	}
}
