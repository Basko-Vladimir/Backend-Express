import {injectable} from "inversify";
import {DevicesSessionsModel} from "../db";
import {mapDbDeviceSessionToDeviceSessionOutputModel} from "../utils/mappers-utils";
import {DeviceSessionOutputModel} from "../../models/devices-sessions/output-models";
import {UpdateOrFilterModel} from "../../common/interfaces";

@injectable()
export class QueryDevicesSessionsRepository {
	async getAllActiveDevicesSessions(filter: UpdateOrFilterModel): Promise<DeviceSessionOutputModel[]> {
		const devicesSessions = await DevicesSessionsModel.find(filter);
		
		return devicesSessions.map(mapDbDeviceSessionToDeviceSessionOutputModel);
	}
}
