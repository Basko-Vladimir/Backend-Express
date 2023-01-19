import {Schema, Types} from "mongoose";
import {DbComment} from "../infrastructure/repositories/interfaces/comments-interfaces";
import {DbClientRequest} from "../infrastructure/repositories/interfaces/client-requests-interfaces";
import {DbDeviceSession} from "../infrastructure/repositories/interfaces/devices-sessions-interfaces";
import {DbLike} from "../infrastructure/repositories/interfaces/likes-interfaces";
import {commentsConstants} from "../common/constants";
import {DATE_ERROR_MESSAGE, generateLengthErrorMessage} from "../common/errors/error-messages";
import {LikeStatus} from "../common/enums";

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
