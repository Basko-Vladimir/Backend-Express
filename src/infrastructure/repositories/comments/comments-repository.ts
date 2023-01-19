import {injectable} from "inversify";
import {getFilterByDbId} from "../utils/mappers-utils";
import {NotFoundError} from "../../../common/errors/errors-types";
import {CommentModel, IComment} from "../../../domain/comments/CommentTypes";

@injectable()
export class CommentsRepository {
	async save(comment: IComment): Promise<IComment> {
		return comment.save();
	}
	
	async deleteComment(id: string): Promise<void> {
		const {deletedCount} = await CommentModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async updateComment(id: string, content: string): Promise<void> {
		const {matchedCount} = await CommentModel.updateOne(
			getFilterByDbId(id),
			{content}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deleteAllComments(): Promise<void> {
		await CommentModel.deleteMany({});
	}
	
	async getCommentById(id: string): Promise<IComment> {
		const comment = await CommentModel.findById(id);
		
		if (!comment) throw new NotFoundError();
		
		return comment;
	}
}
