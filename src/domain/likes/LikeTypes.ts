import {HydratedDocument, Model, model} from "mongoose";
import {ObjectId} from "mongodb";
import {LikeStatus} from "../../common/enums";
import {likeSchema} from "./LikeSchema";

export interface ILikeProps {
	userId: ObjectId;
	userLogin: string;
	commentId: ObjectId | null;
	postId: ObjectId;
	status: LikeStatus;
	createdAt: Date;
}

export interface ILikeMethods {
	updateLikeStatus(status: LikeStatus): ILike;
}

export interface ILike extends HydratedDocument<ILikeProps, ILikeMethods> {}

export interface ILikeModel extends Model<ILikeProps, {}, ILikeMethods> {
	createLikeEntity (userId: string, userLogin: string, postId: string, status: LikeStatus, commentId?: string): ILike
}

export const LikeModel = model<ILikeProps, ILikeModel>("like", likeSchema);
