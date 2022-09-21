import {CommentOutputModel} from "../models/comments/output-models";
import {commentsRepository} from "../repositories/comments/comments-repository";
import {Comment} from "../classes/comments";

export const commentsService = {
	async createComment(
		postId: string,
		commentData: Omit<CommentOutputModel, "id" | "createdAt">
	): Promise<string> {
		const { content, userLogin, userId } = commentData;
		const newComment = new Comment(content, userLogin, userId, postId);
		
		return commentsRepository.createComment(newComment);
	},
	
	async deleteComment(commentId: string): Promise<void> {
		return commentsRepository.deleteComment(commentId);
	}
};
