import {injectable} from "inversify";
import {mapDbDeviceSessionToDeviceSessionOutputModel} from "../utils/mappers-utils";
import {DevicesSessionsModel} from "../../db";
import {DeviceSessionOutputModel} from "../../../api/models/devices-sessions/output-models";
import {UpdateOrFilterModel} from "../../../common/interfaces";

@injectable()
export class QueryDevicesSessionsRepository {
	async getAllActiveDevicesSessions(filter: UpdateOrFilterModel): Promise<DeviceSessionOutputModel[]> {
		const devicesSessions = await DevicesSessionsModel.find(filter);
		
		return devicesSessions.map(mapDbDeviceSessionToDeviceSessionOutputModel);
	}
}
