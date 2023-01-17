import {Schema, Types} from "mongoose";
import {IPost, IPostMethods, IPostModel, IPostProps} from "./PostTypes";
import {MIN_STRINGS_LENGTH, postsConstants} from "../../common/constants";
import {generateLengthErrorMessage} from "../../common/errors/error-messages";

const { MAX_TITLE_LENGTH, MAX_SHORT_DESCRIPTION_LENGTH, MAX_CONTENT_LENGTH } = postsConstants;
export const postSchema = new Schema<IPost, IPostModel, IPostMethods>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_STRINGS_LENGTH, generateLengthErrorMessage("title", MIN_STRINGS_LENGTH, "min")],
		maxlength: [MAX_TITLE_LENGTH, generateLengthErrorMessage("title", MAX_TITLE_LENGTH, "max")]
	},
	shortDescription: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_STRINGS_LENGTH, generateLengthErrorMessage("shortDescription", MIN_STRINGS_LENGTH, "min")],
		maxlength: [MAX_SHORT_DESCRIPTION_LENGTH, generateLengthErrorMessage("shortDescription", MAX_SHORT_DESCRIPTION_LENGTH, "max")]
	},
	content: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_STRINGS_LENGTH, generateLengthErrorMessage("content", MIN_STRINGS_LENGTH, "min")],
		maxlength: [MAX_CONTENT_LENGTH, generateLengthErrorMessage("content", MAX_CONTENT_LENGTH, "max")]
	},
	blogName: {
		type: String,
		required: true,
		trim: true
	},
	blogId: {
		type: Types.ObjectId,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

postSchema.method("updatePostData", function(newData: Omit<IPostProps, "blogName" | "createdAt">) {
	const that = this as IPost;
	const { blogId, title, content, shortDescription } = newData;
	
	that.blogId = blogId;
	that.title = title;
	that.content = content;
	that.shortDescription = shortDescription;
	
	return that;
});
