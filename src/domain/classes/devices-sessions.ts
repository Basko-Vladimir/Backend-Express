import {ObjectId} from "mongodb";

export class DeviceSession {
	issuedAt?: number;
	expiredDate?: number;
	deviceId?: string;
	deviceName?: string;
	ip: string;
	userId: ObjectId;
	
	constructor(
		userId: ObjectId,
		ip: string,
		issuedAt?: number,
		expiredDate?: number,
		deviceId?: string,
		deviceName?: string
	) {
		this.userId = userId;
		this.ip = ip;
		this.issuedAt = issuedAt;
		this.expiredDate = expiredDate;
		this.deviceId = deviceId;
		this.deviceName = deviceName;
	}
}
