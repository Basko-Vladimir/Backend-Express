import {injectable} from "inversify";
import {commentsModel} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DataBaseError, NotFoundError} from "../../classes/errors";
import {Comment} from "../../classes/comments";

@injectable()
export class CommentsRepository {
	async createComment(comment: Comment): Promise<string> {
		const createdComment = await commentsModel.create(comment);
		
		if (!createdComment) throw new DataBaseError();
		
		return String(createdComment._id);
	}
	
	async deleteComment(id: string): Promise<void> {
		const { deletedCount } = await commentsModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async updateComment(id: string, content: string): Promise<void> {
		const { matchedCount } = await commentsModel.updateOne(
			getFilterByDbId(id),
			{content}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deleteAllComments(): Promise<void> {
		await commentsModel.deleteMany({});
	}
	
	async getCommentById(id: string): Promise<Comment> {
		const comment = await commentsModel.findById(id);
		
		if (!comment) throw new NotFoundError();
		
		return comment;
	}
}
