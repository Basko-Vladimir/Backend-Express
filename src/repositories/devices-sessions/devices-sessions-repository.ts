import {injectable} from "inversify";
import {ObjectId} from "mongodb";
import {devicesSessionsCollection} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {EntityWithoutId, UpdateOrFilterModel} from "../../common/interfaces";
import {DeviceSession} from "../../classes/devices-sessions";
import {DataBaseError} from "../../classes/errors";

@injectable()
export class DevicesSessionsRepository {
	async createDeviceSession(deviceSession: EntityWithoutId<DeviceSession>): Promise<string> {
		const { insertedId } = await devicesSessionsCollection.insertOne(deviceSession);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	}
	
	async updateDeviceSession(_id: string, updatedFiled: UpdateOrFilterModel): Promise<void> {
		const {matchedCount} = await devicesSessionsCollection.updateOne(getFilterByDbId(_id), {$set: updatedFiled});
		
		if (!matchedCount) throw new DataBaseError();
	}
	
	async getDeviceSessionByFilter(filter: UpdateOrFilterModel): Promise<DeviceSession | null> {
		const deviceSession = await devicesSessionsCollection.findOne(filter);
		
		return deviceSession || null;
	}
	
	async deleteAllDevicesSessionsExceptCurrent(id: string): Promise<void> {
		const { deletedCount } = await devicesSessionsCollection.deleteMany({_id: {$ne: new ObjectId(id)}});

		if (!deletedCount) throw new DataBaseError();
	}
	
	async deleteDeviceSessionById(_id: string): Promise<void> {
		const { deletedCount } = await devicesSessionsCollection.deleteOne(getFilterByDbId(_id));
		
		if (!deletedCount) throw new DataBaseError();
	}
	
	async deleteAllDevicesSessions(): Promise<void> {
		await devicesSessionsCollection.deleteMany({});
	}
}
