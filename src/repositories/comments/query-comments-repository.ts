import {injectable} from "inversify";
import {commentsModel} from "../db";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbCommentToCommentOutputModel} from "../utils/mappers-utils";
import {CommentOutputModel, CommentQueryParamsOutputModel} from "../../models/comments/output-models";
import {PostAllCommentsOutputModel} from "../../models/posts/output-models";
import {NotFoundError} from "../../classes/errors";

@injectable()
export class QueryCommentsRepository {
	async getCommentById(id: string): Promise<CommentOutputModel> {
		const comment = await commentsModel.findById(id);
		
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
			
			const totalCount = await commentsModel
				.countDocuments()
				.where("postId", postId);
			const comments = await commentsModel
				.find()
				.where("postId", postId)
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting);
			
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
