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
		let actualLikesCount = likesCount;
		let actualDislikesCount = dislikesCount;
		let actualStatus = newStatus;
		
		switch (myStatus) {
			case LikeStatus.NONE: {
				if (newStatus === LikeStatus.LIKE) {
					actualLikesCount++;
				} else if (newStatus === LikeStatus.DISLIKE) {
					actualDislikesCount++;
				}
				break;
			}
			case LikeStatus.LIKE: {
				if (newStatus === LikeStatus.LIKE) {
					actualLikesCount++;
				} else if (newStatus === LikeStatus.DISLIKE) {
					actualLikesCount--;
					actualDislikesCount++;
					actualStatus = LikeStatus.DISLIKE;
				} else {
					actualLikesCount--;
					actualStatus = LikeStatus.NONE;
				}
				break;
			}
			case LikeStatus.DISLIKE: {
				if (newStatus === LikeStatus.LIKE) {
					actualLikesCount++;
					actualDislikesCount--;
					actualStatus = LikeStatus.LIKE;
				} else if (newStatus === LikeStatus.DISLIKE) {
					actualDislikesCount++;
				} else {
					actualDislikesCount--;
					actualStatus = LikeStatus.NONE;
				}
			}
		}

		const commentLikeInfo: LikesInfo = {
			myStatus: actualStatus,
			likesCount: actualLikesCount,
			dislikesCount: actualDislikesCount,
		};
		
		return this.commentsRepository.updateLikeStatus(commentId, commentLikeInfo);
	}
}
