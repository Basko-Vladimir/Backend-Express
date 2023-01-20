import {inject, injectable} from "inversify";
import {LikesService} from "./likes-service";
import {CommentsRepository} from "../../infrastructure/repositories/comments/comments-repository";
import {LikeStatus} from "../../common/enums";
import {QueryLikesRepository} from "../../infrastructure/repositories/likes/query-likes-repository";
import {IComment} from "../../domain/comments/CommentTypes";
import {CommentDataDTO} from "../../api/models/comments/input-models";
import {PostsService} from "./posts-service";
import {IUser} from "../../domain/users/UserTypes";

@injectable()
export class CommentsService {
	constructor(
		@inject(CommentsRepository) protected commentsRepository: CommentsRepository,
		@inject(QueryLikesRepository) protected queryLikesRepository: QueryLikesRepository,
		@inject(LikesService) protected likesService: LikesService,
		@inject(PostsService) protected postsService: PostsService
	) {}
	
	async createComment(
		commentData: CommentDataDTO
	): Promise<string> {
		return this.postsService.createCommentByPostId(commentData);
	}
	
	async updateComment(commentId: string, content: string): Promise<void> {
		const targetComment = await this.getCommentById(commentId);
		const updatedComment = targetComment.updateCommentContent(content);
		
		await this.commentsRepository.save(updatedComment);
	}
	
	async deleteComment(commentId: string): Promise<void> {
		return this.commentsRepository.deleteComment(commentId);
	}
	
	async deleteAllComments(): Promise<void> {
		return this.commentsRepository.deleteAllComments();
	}
	
	async getCommentById(id: string): Promise<IComment> {
		return this.commentsRepository.getCommentById(id);
	}
	
	async updateCommentLikeStatus (user: IUser, commentId: string, newStatus: LikeStatus): Promise<void> {
		const existingLike = await this.likesService.getLikeByFilter({userId: user._id, commentId});
		
		if (existingLike) {
			return this.likesService.updateLike(String(existingLike?._id), newStatus);
		} else {
			const targetComment = await this.commentsRepository.getCommentById(commentId);
			await this.likesService.createLike(user, String(targetComment.postId), newStatus, commentId);
		}
	}
}
