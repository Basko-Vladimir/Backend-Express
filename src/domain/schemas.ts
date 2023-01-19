import {Schema, Types} from "mongoose";
import {DbClientRequest} from "../infrastructure/repositories/interfaces/client-requests-interfaces";
import {DbDeviceSession} from "../infrastructure/repositories/interfaces/devices-sessions-interfaces";
import {DbLike} from "../infrastructure/repositories/interfaces/likes-interfaces";
import {LikeStatus} from "../common/enums";

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
