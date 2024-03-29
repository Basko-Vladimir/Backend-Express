import {Schema} from "mongoose";
import {BlogModel, IBlog, IBlogMethods, IBlogModel, IBlogProps} from "./BlogTypes";
import {blogsConstants, MIN_STRINGS_LENGTH} from "../../common/constants";
import {generateLengthErrorMessage, generateRegExpError} from "../../common/errors/error-messages";
import {IPost, IPostProps, PostModel} from "../posts/PostTypes";

const { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_WEBSITE_URL_LENGTH, WEBSITE_URL_REG_EXP } = blogsConstants;
export const blogSchema = new Schema<IBlog, IBlogModel, IBlogMethods>({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_STRINGS_LENGTH, generateLengthErrorMessage("name", MIN_STRINGS_LENGTH, "min")],
		maxlength: [MAX_NAME_LENGTH, generateLengthErrorMessage("name", MAX_NAME_LENGTH, "max")]
	},
	websiteUrl: {
		type: String,
		required: true,
		trim: true,
		maxlength: [MAX_WEBSITE_URL_LENGTH, generateLengthErrorMessage("websiteUrl", MAX_WEBSITE_URL_LENGTH, "max")],
		validate: [WEBSITE_URL_REG_EXP, generateRegExpError("websiteUrl", WEBSITE_URL_REG_EXP)]
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_STRINGS_LENGTH, generateLengthErrorMessage("description", MIN_STRINGS_LENGTH, "min")],
		maxlength: [MAX_DESCRIPTION_LENGTH, generateLengthErrorMessage("description", MAX_DESCRIPTION_LENGTH, "max")]
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

blogSchema.method("updateBlogData", function(data: Omit<IBlogProps, "createdAt">): IBlog {
	const that = this as IBlog;
	const { name, websiteUrl, description } = data;
	
	that.name = name;
	that.websiteUrl = websiteUrl;
	that.description = description;
	
	return that;
});

blogSchema.method("createPost", function(data: IPostProps): IPost {
	return new PostModel(data);
});

blogSchema.static(
	"createBlogEntity",
	function (
		name: string,
		websiteUrl: string,
		description: string
	): IBlog {
	return new BlogModel({name, websiteUrl, description});
});
