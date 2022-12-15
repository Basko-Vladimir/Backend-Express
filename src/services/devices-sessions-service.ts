import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus} from "../controllers/utils";
import {DeviceSession} from "../classes/devices-sessions";
import {DevicesSessionsRepository} from "../repositories/devices-sessions/devices-sessions-repository";
import {EntityWithoutId} from "../common/interfaces";

@injectable()
export class DevicesSessionsService {
	constructor(
		@inject(DevicesSessionsRepository) protected devicesSessionsRepository: DevicesSessionsRepository
	) {}
	
	async createDeviceSession (deviceSessionDataInputModel: EntityWithoutId<DeviceSession>): Promise<string> {
		const { userId, ip, issuedAt, expiredDate, deviceId, deviceName } = deviceSessionDataInputModel;
		const newDeviceSession = new DeviceSession(userId, ip, issuedAt, expiredDate, deviceId, deviceName);
		
		return this.devicesSessionsRepository.createDeviceSession(newDeviceSession)
	}
	
	async updateDeviceSession (_id: string, updatedFiled: {[key: string]: unknown}): Promise<void> {
		return this.devicesSessionsRepository.updateDeviceSession(_id, updatedFiled);
	}
	
	async getDeviceSessionByFilter (filter: {[key: string]: unknown}): Promise<DeviceSession | null> {
		return this.devicesSessionsRepository.getDeviceSessionByFilter(filter);
	}
	
	async deleteAllDevicesSessionsExceptCurrent (id: string): Promise<void> {
		return this.devicesSessionsRepository.deleteAllDevicesSessionsExceptCurrent(id);
	}
	
	async deleteDeviceSessionById (req: Request, res: Response<void>) {
		try {
		
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
