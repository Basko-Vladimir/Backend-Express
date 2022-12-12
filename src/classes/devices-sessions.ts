import {ObjectId} from "mongodb";
import {v4 as uuidv4} from "uuid";

export class DeviceSession {
	_id: ObjectId | null = null;
	issuedAt: Date;
	deviceId: string;
	deviceName: string;
	userId: ObjectId;
	
	constructor(issuedAt: Date, deviceName: string, userId: ObjectId) {
		this.issuedAt = issuedAt;
		this.deviceId = uuidv4();
		this.deviceName = deviceName;
		this.userId = userId;
	}
}
