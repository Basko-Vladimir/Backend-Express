import {injectable} from "inversify";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbCommentToCommentOutputModel} from "../utils/mappers-utils";
import {CommentOutputModel, CommentQueryParamsOutputModel} from "../../../api/models/comments/output-models";
import {PostAllCommentsOutputModel} from "../../../api/models/posts/output-models";
import {NotFoundError} from "../../../common/errors/errors-types";
import { CommentModel } from "../../../domain/comments/CommentTypes";

@injectable()
export class QueryCommentsRepository {
	async getCommentById(id: string): Promise<CommentOutputModel> {
		const comment = await CommentModel.findById(id);
		
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
			
			const totalCount = await CommentModel
				.countDocuments()
				.where("postId", postId);
			const comments = await CommentModel
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
