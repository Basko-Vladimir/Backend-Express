import {CommentOutputModel, FullCommentOutputModel} from "../models/comments/output-models";
import {ExtendedLikesInfoOutputModel, LikesInfoOutputModel} from "../models/likes/output-models";
import {FullPostOutputModel, PostOutputModel} from "../models/posts/output-models";
import { DataBaseError } from "../../common/errors/errors-types";

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

export const getFullPostOutputModel = (
	post: PostOutputModel,
	extendedLikesInfo: ExtendedLikesInfoOutputModel
): FullPostOutputModel => ({
	id: post.id,
	title: post.title,
	shortDescription: post.shortDescription,
	content: post.content,
	blogId: post.blogId,
	blogName: post.blogName,
	createdAt: post.createdAt,
	extendedLikesInfo: extendedLikesInfo
});
