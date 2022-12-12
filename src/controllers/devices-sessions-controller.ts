import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {DeviceSessionOutputModel} from "../models/devices-sessions/output-models";
import {DevicesSessionsService} from "../services/devices-sessions-service";
import {QueryDevicesSessionsRepository} from "../repositories/devices-sessions/query-devices-sessions-repository";
import {getErrorStatus} from "./utils";

@injectable()
export class DevicesSessionsController {
	constructor(
		@inject(DevicesSessionsService) protected devicesSessionsService: DevicesSessionsService,
		@inject(QueryDevicesSessionsRepository) protected queryDevicesSessionsRepository: QueryDevicesSessionsRepository
	) {}
	
	async getAllActiveDevicesSessions (req: Request, res: Response<DeviceSessionOutputModel>) {
		try {
		
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteAllOtherDevicesSessions (req: Request, res: Response<any>) {
		try {
		
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteDeviceSessionById (req: Request, res: Response<any>) {
		try {
		
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
