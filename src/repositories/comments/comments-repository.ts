import {commentsCollection} from "../db";
import {DbComment} from "../interfaces/comments-interfaces";
import {EntityWithoutId} from "../../common/interfaces";
import {DataBaseError} from "../../classes/errors";

export const commentsRepository = {
	async createComment(comment: EntityWithoutId<DbComment>): Promise<string> {
		const { insertedId } = await commentsCollection.insertOne(comment);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	}
};
