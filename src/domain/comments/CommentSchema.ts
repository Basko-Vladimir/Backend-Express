import {Schema, Types} from "mongoose";
import {commentsConstants} from "../../common/constants";
import {generateLengthErrorMessage} from "../../common/errors/error-messages";
import {IComment, ICommentModel} from "./CommentTypes";

export const commentSchema = new Schema<IComment, {}, ICommentModel>({
	content: {
		type: String,
		required: true,
		trim: true,
		minlength: [
			commentsConstants.MIN_CONTENT_LENGTH,
			generateLengthErrorMessage("content", commentsConstants.MIN_CONTENT_LENGTH, "min")],
		maxlength: [
			commentsConstants.MAX_CONTENT_LENGTH,
			generateLengthErrorMessage("content",commentsConstants.MAX_CONTENT_LENGTH, "max")
		]
	},
	userId: {
		type: Types.ObjectId,
		required: true
	},
	postId: {
		type: Types.ObjectId,
		required: true
	},
	userLogin: {
		type: String,
		required: true,
		trim: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

commentSchema.method("updateCommentContent", function (content: string): IComment {
	const that = this as IComment;
	
	that.content = content;
	
	return that;
});
