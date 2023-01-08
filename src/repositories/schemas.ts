import {Schema, Types} from "mongoose";
import {DbBlog} from "./interfaces/blogs-interfaces";
import {DbPost} from "./interfaces/posts-interfaces";
import {DbUser} from "./interfaces/users-interfaces";
import {DbComment} from "./interfaces/comments-interfaces";
import {DbClientRequest} from "./interfaces/client-requests-interfaces";
import {DbDeviceSession} from "./interfaces/devices-sessions-interfaces";
import {DbLike} from "./interfaces/likes-interfaces";
import {
	blogsConstants,
	commentsConstants,
	MIN_STRINGS_LENGTH,
	postsConstants,
	usersConstants
} from "../common/constants";
import {DATE_ERROR_MESSAGE, generateLengthErrorMessage, generateRegExpError} from "../common/error-messages";
import {LikeStatus} from "../common/enums";

// Blogs collection Schema
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
		min: [new Date(), DATE_ERROR_MESSAGE]
	}
});

// Posts collection Schema
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
	blogId: {
		type: Types.ObjectId,
		required: true
	},
	createdAt: {
		type: Date,
		min: [new Date(), DATE_ERROR_MESSAGE]
	}
});

// Users collection Schema
const { MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH, LOGIN_REG_EXP, EMAIL_REG_EXP } = usersConstants;
export const usersSchema = new Schema<DbUser>({
	login: {
		type: String,
		required: true,
		trim: true,
		minlength: [MIN_LOGIN_LENGTH, generateLengthErrorMessage("login", MIN_LOGIN_LENGTH, "min")],
		maxlength: [MAX_LOGIN_LENGTH, generateLengthErrorMessage("login", MAX_LOGIN_LENGTH, "max")],
		validate: [LOGIN_REG_EXP, generateRegExpError("login", LOGIN_REG_EXP)]
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate: [EMAIL_REG_EXP, generateRegExpError("email", EMAIL_REG_EXP)]
	},
	passwordSalt: {
		type: String,
		required: true,
		trim: true
	},
	passwordHash: {
		type: String,
		required: true,
		trim: true
	},
	passwordRecoveryCode: {
		type: String,
		default: null
	},
	createdAt: {
		type: Date,
		min: [new Date(), DATE_ERROR_MESSAGE]
	},
	emailConfirmation: {
		confirmationCode: {
			type: String,
			required: true,
			trim: true
		},
		isConfirmed: {
			type: Boolean,
			required: true,
			default: false
		},
		expirationDate: {
			type: Date,
			min: [new Date(), DATE_ERROR_MESSAGE]
		}
	}
});

// Comments collection Schema
export const commentsSchema = new Schema<DbComment>({
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
		min: [new Date(), DATE_ERROR_MESSAGE]
	}
});

// Likes collection Schema
export const likesSchema = new Schema<DbLike>({
	userId: {
		type: Types.ObjectId,
		required: true
	},
	commentId: {
		type: Types.ObjectId,
		required: true
	},
	status: {
		type: String,
		enum: [LikeStatus.LIKE, LikeStatus.DISLIKE, LikeStatus.NONE],
		required: true
	}
});

// ClientRequest collection Schema
export const clientRequestsSchema = new Schema<DbClientRequest>({
	endpoint: {
		type: String,
		required: true,
		trim: true
	},
	ip: {
		type: String,
		required: true,
		trim: true
	},
	createTimeStamp: {
		type: Number,
		required: true
	}
});

// DevicesSessions collection Schema
export const devicesSessionsSchema = new Schema<DbDeviceSession>({
	issuedAt: {
		type: Number,
		required: true
	},
	expiredDate: {
		type: Number,
		required: true
	},
	deviceId: {
		type: String,
		required: true,
		trim: true
	},
	deviceName: {
		type: String,
		required: true,
		trim: true
	},
	ip: {
		type: String,
		required: true,
		trim: true
	},
	userId: {
		type: Types.ObjectId,
		required: true
	}
});
