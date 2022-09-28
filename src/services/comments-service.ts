import {CommentOutputModel} from "../models/comments/output-models";
import {commentsRepository} from "../repositories/comments/comments-repository";
import {Comment} from "../classes/comments";

class CommentsService {
	async createComment(
		postId: string,
		commentData: Omit<CommentOutputModel, "id" | "createdAt">
	): Promise<string> {
		const { content, userLogin, userId } = commentData;
		const newComment = new Comment(content, userLogin, userId, postId);
		
		return commentsRepository.createComment(newComment);
	}
	
	async deleteComment(commentId: string): Promise<void> {
		return commentsRepository.deleteComment(commentId);
	}
	
	async updateComment(commentId: string, content: string): Promise<void> {
		return commentsRepository.updateComment(commentId, content);
	}
	
	async deleteAllComments(): Promise<void> {
		return commentsRepository.deleteAllComments();
	}
}

export const commentsService = new CommentsService();
