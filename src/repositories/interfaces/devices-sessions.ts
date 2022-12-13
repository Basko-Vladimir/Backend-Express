import {ObjectId} from "mongodb";

export interface DbDeviceSession {
	_id: ObjectId;
	issuedAt?: number;
	expiredDate?: number;
	deviceId?: string;
	deviceName?: string;
	ip: string;
	userId: ObjectId;
}