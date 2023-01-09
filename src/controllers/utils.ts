import {DataBaseError} from "../classes/errors";
import {CommentOutputModel, FullCommentOutputModel} from "../models/comments/output-models";
import {LikesInfoOutputModel} from "../models/likes/output-models";

export const getErrorStatus = (error: unknown): number => {
	return error instanceof DataBaseError ? 500 : 404;
};

export const getFullCommentOutputModel = (
	comment: CommentOutputModel,
	like: LikesInfoOutputModel
): FullCommentOutputModel => ({
	id: comment.id,
	userId: comment.userId,
	userLogin: comment.userLogin,
	content: comment.content,
	createdAt: comment.createdAt,
	likesInfo: {
		myStatus: like.likeStatus,
		likesCount: like.likesCount,
		dislikesCount: like.dislikesCount
	}
});
