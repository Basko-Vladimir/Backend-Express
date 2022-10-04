import {inject, injectable} from "inversify";
import {CommentOutputModel} from "../models/comments/output-models";
import {CommentsRepository} from "../repositories/comments/comments-repository";
import {Comment} from "../classes/comments";

@injectable()
export class CommentsService {
	constructor(
		@inject(CommentsRepository) protected commentsRepository: CommentsRepository
	) {}
	
	async createComment(
		postId: string,
		commentData: Omit<CommentOutputModel, "id" | "createdAt">
	): Promise<string> {
		const { content, userLogin, userId } = commentData;
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
}
