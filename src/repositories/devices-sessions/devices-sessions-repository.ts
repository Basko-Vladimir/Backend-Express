import {injectable} from "inversify";
import {devicesSessionsCollection} from "../db";
import {EntityWithoutId} from "../../common/interfaces";
import {DeviceSession} from "../../classes/devices-sessions";
import {DataBaseError} from "../../classes/errors";
import {getFilterByDbId} from "../utils/mappers-utils";

@injectable()
export class DevicesSessionsRepository {
	async createDeviceSession(deviceSession: EntityWithoutId<DeviceSession>): Promise<string> {
		const { insertedId } = await devicesSessionsCollection.insertOne(deviceSession);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	}
	
	async updateDeviceSession(_id: string, updatedFiled: {[key: string]: unknown}): Promise<void> {
		console.log("DevicesSessionsRepository")
		const {matchedCount} = await devicesSessionsCollection.updateOne(getFilterByDbId(_id), {$set: updatedFiled});
		
		if (!matchedCount) throw new DataBaseError();
	}
	
	async getDeviceSessionByFilter(filter: {[key: string]: unknown}): Promise<DeviceSession | null> {
		const deviceSession = await devicesSessionsCollection.findOne(filter);
		
		return deviceSession || null;
	}
	
	async deleteAllOtherDevicesSessions(): Promise<void> {
	
	}
	
	async deleteDeviceSessionById(): Promise<void> {
	
	}
}
