import {inject, injectable} from "inversify";
import {CommentsRepository} from "../repositories/comments/comments-repository";
import {Comment, CommentDataDTO, LikesInfo} from "../classes/comments";
import {LikeStatus} from "../common/enums";

@injectable()
export class CommentsService {
	constructor(
		@inject(CommentsRepository) protected commentsRepository: CommentsRepository
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
	
	async updateLikeStatus (commentId: string, newStatus: LikeStatus): Promise<void> {
		const { likesInfo: { likesCount, dislikesCount, myStatus }} = await this.getCommentById(commentId);
		let newLikesCount = likesCount;
		let newDislikesCount = dislikesCount;
		
		if (myStatus === LikeStatus.DISLIKE && newStatus === LikeStatus.LIKE) {
			newLikesCount++;
			newDislikesCount--;
		} else if (newStatus === LikeStatus.LIKE) {
			newLikesCount++;
		} else if (myStatus === LikeStatus.LIKE && newStatus === LikeStatus.DISLIKE) {
			newLikesCount--;
			newDislikesCount++;
		} else if (newStatus === LikeStatus.DISLIKE) {
			newDislikesCount++;
		}
		
		const commentLikeInfo: LikesInfo = {
			myStatus: newStatus,
			likesCount: newLikesCount,
			dislikesCount: newDislikesCount,
		};
		
		return this.commentsRepository.updateLikeStatus(commentId, commentLikeInfo);
	}
}
