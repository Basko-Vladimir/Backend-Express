import {Schema, Types} from "mongoose";
import {LikeStatus} from "../../common/enums";
import {ILike, ILikeModel, LikeModel} from "./LikeTypes";

export const likeSchema = new Schema<ILike, {}, ILikeModel>(
	{
		userId: {
			type: Types.ObjectId,
			required: true
		},
		userLogin: {
			type: String,
			required: true
		},
		commentId: {
			type: Types.ObjectId,
			default: null
		},
		postId: {
			type: Types.ObjectId,
			required: true
		},
		status: {
			type: String,
			enum: [LikeStatus.LIKE, LikeStatus.DISLIKE, LikeStatus.NONE],
			required: true
		}
	},
	{timestamps: true}
);

likeSchema.method("updateLikeStatus", function (status: LikeStatus): ILike {
	const that = this as ILike;
	
	that.status = status;
	
	return that;
});

likeSchema.static("createLikeEntity", function(
	userId: string,
	userLogin: string,
	postId: string,
	status: LikeStatus,
	commentId?: string
): ILike {
	return new LikeModel({userId, userLogin, postId, status, commentId});
});
