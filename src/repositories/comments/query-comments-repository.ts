import {commentsCollection} from "../db";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {getFilterByDbId, mapDbCommentToCommentOutputModel} from "../utils/mappers-utils";
import {CommentOutputModel, CommentQueryParamsOutputModel} from "../../models/comments/output-models";
import {PostAllCommentsOutputModel} from "../../models/posts/output-models";
import {NotFoundError} from "../../classes/errors";
import {ObjectId} from "mongodb";

export class QueryCommentsRepository {
	async getCommentById(id: string): Promise<CommentOutputModel> {
		const comment = await commentsCollection.findOne(getFilterByDbId(id));
		
		if (!comment) throw new NotFoundError();
		
		return mapDbCommentToCommentOutputModel(comment);
	}
	
	async getAllCommentsByPostId(
		queryParams: CommentQueryParamsOutputModel,
		postId: string
	): Promise<PostAllCommentsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize } = queryParams;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			const filterByPostId = {postId: new ObjectId(postId)};
			
			const totalCount = await commentsCollection.countDocuments(filterByPostId);
			const comments = await commentsCollection
				.find(filterByPostId)
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting)
				.toArray();
			
			return {
				pagesCount: Math.ceil(totalCount / pageSize),
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: comments.map(mapDbCommentToCommentOutputModel)
			};
		} catch {
			throw new NotFoundError();
		}
	}
}
