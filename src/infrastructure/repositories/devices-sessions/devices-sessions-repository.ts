import {injectable} from "inversify";
import {ObjectId} from "mongodb";
import {DevicesSessionsModel} from "../../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {EntityWithoutId, UpdateOrFilterModel} from "../../../common/interfaces";
import {DeviceSession} from "../../../domain/entities/devices-sessions";
import {DbDeviceSession} from "../interfaces/devices-sessions-interfaces";
import {DataBaseError} from "../../../common/errors/errors-types";

@injectable()
export class DevicesSessionsRepository {
	async createDeviceSession(deviceSession: EntityWithoutId<DeviceSession>): Promise<string> {
		const createdDeviceSession = await DevicesSessionsModel.create(deviceSession);
		
		if (!createdDeviceSession) throw new DataBaseError();
		
		return String(createdDeviceSession._id);
	}
	
	async updateDeviceSession(_id: string, updatedFiled: UpdateOrFilterModel): Promise<void> {
		const {matchedCount} = await DevicesSessionsModel.updateOne(getFilterByDbId(_id), updatedFiled);
		
		if (!matchedCount) throw new DataBaseError();
	}
	
	async getDeviceSessionByFilter(filter: UpdateOrFilterModel): Promise<DbDeviceSession | null> {
		const deviceSession = await DevicesSessionsModel.findOne(filter);
		
		return deviceSession || null;
	}
	
	async deleteAllDevicesSessionsExceptCurrent(id: string): Promise<void> {
		const { deletedCount } = await DevicesSessionsModel.deleteMany({_id: {$ne: new ObjectId(id)}});

		if (!deletedCount) throw new DataBaseError();
	}
	
	async deleteDeviceSessionById(_id: string): Promise<void> {
		const { deletedCount } = await DevicesSessionsModel.deleteOne(getFilterByDbId(_id));
		
		if (!deletedCount) throw new DataBaseError();
	}
	
	async deleteAllDevicesSessions(): Promise<void> {
		await DevicesSessionsModel.deleteMany({});
	}
}
