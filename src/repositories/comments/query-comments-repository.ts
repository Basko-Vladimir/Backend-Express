import {commentsCollection} from "../db";
import {getFilterByDbId, mapDbCommentToCommentOutputModel} from "../utils/mappers-utils";
import {CommentOutputModel} from "../../models/comments/output-models";
import {NotFoundError} from "../../classes/errors";

export const queryCommentsRepository = {
	async getCommentById(id: string): Promise<CommentOutputModel> {
		const comment = await commentsCollection.findOne(getFilterByDbId(id));
		
		if (!comment) throw new NotFoundError();
		
		return mapDbCommentToCommentOutputModel(comment);
	}
};
