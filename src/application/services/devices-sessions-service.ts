import {inject, injectable} from "inversify";
import {DeviceSession} from "../../domain/classes/devices-sessions";
import {DevicesSessionsRepository} from "../../infrastructure/repositories/devices-sessions/devices-sessions-repository";
import {DbDeviceSession} from "../../infrastructure/repositories/interfaces/devices-sessions-interfaces";
import {EntityWithoutId, UpdateOrFilterModel} from "../../common/interfaces";

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
	
	async updateDeviceSession (_id: string, updatedFiled: UpdateOrFilterModel): Promise<void> {
		return this.devicesSessionsRepository.updateDeviceSession(_id, updatedFiled);
	}
	
	async getDeviceSessionByFilter (filter: UpdateOrFilterModel): Promise<DbDeviceSession | null> {
		return this.devicesSessionsRepository.getDeviceSessionByFilter(filter);
	}
	
	async deleteAllDevicesSessionsExceptCurrent (id: string): Promise<void> {
		return this.devicesSessionsRepository.deleteAllDevicesSessionsExceptCurrent(id);
	}
	
	async deleteDeviceSessionById (_id: string): Promise<void> {
		return this.devicesSessionsRepository.deleteDeviceSessionById(_id);
	}
	
	async deleteAllDevicesSessions(): Promise<void> {
		return this.devicesSessionsRepository.deleteAllDevicesSessions();
	}
}
