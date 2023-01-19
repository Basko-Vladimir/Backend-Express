import {HydratedDocument, Model, model} from "mongoose";
import {ObjectId} from "mongodb";
import {commentSchema} from "./CommentSchema";

export interface ICommentProps {
	content: string;
	postId: ObjectId;
	userId: ObjectId;
	userLogin: string;
	createdAt: Date;
}

export interface ICommentMethods {
	updateCommentContent(content: string): IComment;
}

export interface IComment extends HydratedDocument<ICommentProps, ICommentMethods> {}

export interface ICommentModel extends Model<ICommentProps, {}, ICommentMethods> {}

export const CommentModel = model<ICommentProps, ICommentModel>("comment", commentSchema);
