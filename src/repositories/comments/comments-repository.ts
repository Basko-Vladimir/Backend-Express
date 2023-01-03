import {injectable} from "inversify";
import {CommentsModel} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DataBaseError, NotFoundError} from "../../classes/errors";
import {Comment, LikesInfo} from "../../classes/comments";

@injectable()
export class CommentsRepository {
	async createComment(comment: Comment): Promise<string> {
		const createdComment = await CommentsModel.create(comment);
		
		if (!createdComment) throw new DataBaseError();
		
		return String(createdComment._id);
	}
	
	async deleteComment(id: string): Promise<void> {
		const { deletedCount } = await CommentsModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async updateComment(id: string, content: string): Promise<void> {
		const { matchedCount } = await CommentsModel.updateOne(
			getFilterByDbId(id),
			{content}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deleteAllComments(): Promise<void> {
		await CommentsModel.deleteMany({});
	}
	
	async getCommentById(id: string): Promise<Comment> {
		const comment = await CommentsModel.findById(id);
		
		if (!comment) throw new NotFoundError();
		
		return comment;
	}
	
	async updateLikeStatus (commentId: string, likeInfo: LikesInfo): Promise<void> {
			const { myStatus, likesCount, dislikesCount } = likeInfo;
			const { matchedCount } = await CommentsModel.updateOne(
				getFilterByDbId(commentId),
				{likesInfo: {myStatus, likesCount, dislikesCount}}
			);
			
			if (!matchedCount) throw new NotFoundError();
	}
}
