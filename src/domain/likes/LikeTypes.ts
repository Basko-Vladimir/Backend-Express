import {HydratedDocument, Model, model} from "mongoose";
import {ObjectId} from "mongodb";
import {LikeStatus} from "../../common/enums";
import {likeSchema} from "./LikeSchema";

export interface ILikeProps {
	userId: ObjectId;
	commentId: ObjectId;
	status: LikeStatus;
}

export interface ILikeMethods {
	updateLikeStatus(status: LikeStatus): ILike;
}

export interface ILike extends HydratedDocument<ILikeProps, ILikeMethods> {}

export interface ILikeModel extends Model<ILikeProps, {}, ILikeMethods> {
	createLikeEntity (userId: string, commentId: string, status: LikeStatus): ILike
}

export const LikeModel = model<ILikeProps, ILikeModel>("like", likeSchema);
