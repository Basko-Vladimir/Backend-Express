import {Schema, Types} from "mongoose";
import {DbBlog} from "./interfaces/blogs-interfaces";
import {
	MIN_STRINGS_LENGTH,
	blogsConstants,
	postsConstants
} from "../common/constants";
import {DbPost} from "./interfaces/posts-interfaces";
import { generateLengthErrorMessage } from "./utils/common-utils";

// Blogs Collection Schema
const { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_WEBSITE_URL_LENGTH, WEBSITE_URL_REG_EXP } = blogsConstants;
export const blogsSchema = new Schema<DbBlog>({
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
		validate: [WEBSITE_URL_REG_EXP, `URL doesn't match to pattern ${WEBSITE_URL_REG_EXP}`]
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
		min: [new Date(), "Can not create an entity with a past Date"]
	}
});

// Posts Collection Schema
const { MAX_TITLE_LENGTH, MAX_SHORT_DESCRIPTION_LENGTH, MAX_CONTENT_LENGTH } = postsConstants;
export const postsSchema = new Schema<DbPost>({
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
	blogId: Types.ObjectId,
	createdAt: {
		type: Date,
		min: [new Date(), "Can not create an entity with a past Date"]
	}
});