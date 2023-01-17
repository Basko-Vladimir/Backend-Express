import {inject, injectable} from "inversify";
import {CommentsService} from "./comments-service";
import {LikesService} from "./likes-service";
import {CommentDataDTO} from "../../domain/entities/comments";
import {PostsRepository} from "../../infrastructure/repositories/posts/posts-repository";
import {UpdatePostInputModel} from "../../api/models/posts/input-models";
import {IPost} from "../../domain/posts/PostTypes";
import {BlogsService} from "./blogs-service";
import {NotFoundError} from "../../common/errors/errors-types";
import {CreateBlogPostInputModel} from "../../api/models/blogs/input-models";

@injectable()
export class PostsService {
	constructor(
		@inject(PostsRepository) protected postsRepository: PostsRepository,
		@inject(CommentsService) protected commentsService: CommentsService,
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
		const commentId = await this.commentsService.createComment(commentData);
		
		await this.likesService.createLike(String(commentData.userId), commentId);
		
		return commentId;
	}
}
