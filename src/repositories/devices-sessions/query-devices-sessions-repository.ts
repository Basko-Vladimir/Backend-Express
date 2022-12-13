import {injectable} from "inversify";
import {DeviceSessionOutputModel} from "../../models/devices-sessions/output-models";
import {devicesSessionsCollection} from "../db";
import {mapDbDeviceSessionToDeviceSessionOutputModel} from "../utils/mappers-utils";

@injectable()
export class QueryDevicesSessionsRepository {
	async getAllActiveDevicesSessions(filter: {[key: string]: unknown}): Promise<DeviceSessionOutputModel[]> {
		const devicesSessions = await devicesSessionsCollection.find(filter).toArray();
		
		return devicesSessions.map(mapDbDeviceSessionToDeviceSessionOutputModel);
	}
}
