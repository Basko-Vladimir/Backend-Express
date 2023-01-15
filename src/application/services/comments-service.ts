import {inject, injectable} from "inversify";
import {CommentsRepository} from "../../infrastructure/repositories/comments/comments-repository";
import {Comment, CommentDataDTO} from "../../domain/classes/comments";
import {LikeStatus} from "../../common/enums";
import {QueryLikesRepository} from "../../infrastructure/repositories/likes/query-likes-repository";
import {LikesService} from "./likes-service";

@injectable()
export class CommentsService {
	constructor(
		@inject(CommentsRepository) protected commentsRepository: CommentsRepository,
		@inject(QueryLikesRepository) protected queryLikesRepository: QueryLikesRepository,
		@inject(LikesService) protected likesService: LikesService
	) {}
	
	async createComment(
		commentData: CommentDataDTO
	): Promise<string> {
		const { content, userLogin, userId, postId } = commentData;
		const newComment = new Comment(content, userLogin, userId, postId);
		
		return this.commentsRepository.createComment(newComment);
	}
	
	async deleteComment(commentId: string): Promise<void> {
		return this.commentsRepository.deleteComment(commentId);
	}
	
	async updateComment(commentId: string, content: string): Promise<void> {
		return this.commentsRepository.updateComment(commentId, content);
	}
	
	async deleteAllComments(): Promise<void> {
		return this.commentsRepository.deleteAllComments();
	}
	
	async getCommentById(id: string): Promise<Comment> {
		return this.commentsRepository.getCommentById(id);
	}
	
	async updateLikeStatus (userId: string, commentId: string, newStatus: LikeStatus): Promise<void> {
		const existingLike = await this.likesService.getLikeByFilter({userId, commentId});
		
		if (existingLike) {
			return this.likesService.updateLike(String(existingLike?._id), newStatus);
		} else {
			await this.likesService.createLike(userId, commentId, newStatus);
		}
	}
}
