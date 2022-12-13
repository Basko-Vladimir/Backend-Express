import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {DeviceSessionOutputModel} from "../models/devices-sessions/output-models";
import {DevicesSessionsService} from "../services/devices-sessions-service";
import {QueryDevicesSessionsRepository} from "../repositories/devices-sessions/query-devices-sessions-repository";
import {TypedRequestParams} from "../common/interfaces";
import {ParamDeviceSessionIdInputModel} from "../models/devices-sessions/input-models";
import {getErrorStatus} from "./utils";

@injectable()
export class DevicesSessionsController {
	constructor(
		@inject(DevicesSessionsService) protected devicesSessionsService: DevicesSessionsService,
		@inject(QueryDevicesSessionsRepository) protected queryDevicesSessionsRepository: QueryDevicesSessionsRepository
	) {}
	
	async getAllActiveDevicesSessions (req: Request, res: Response<DeviceSessionOutputModel[]>) {
		try {
			const devicesSessions = await this.queryDevicesSessionsRepository
				.getAllActiveDevicesSessions({userId: req.context.user!._id});
			
			res.status(200).send(devicesSessions);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteAllOtherDevicesSessions (req: Request, res: Response<void>) {
		try {
		
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteDeviceSessionById (req: TypedRequestParams<ParamDeviceSessionIdInputModel>, res: Response<void>) {
		try {
		
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
