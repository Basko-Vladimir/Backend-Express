import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus} from "./utils";
import {DeviceSessionOutputModel} from "../../application/models/devices-sessions/output-models";
import {DevicesSessionsService} from "../../application/services/devices-sessions-service";
import {QueryDevicesSessionsRepository} from "../../infrastructure/repositories/devices-sessions/query-devices-sessions-repository";
import {TypedRequestParams} from "../../common/interfaces";
import {ParamDeviceSessionIdInputModel} from "../../application/models/devices-sessions/input-models";

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
	
	async deleteAllDevicesSessionsExceptCurrent (req: Request, res: Response<void>) {
		try {
			await this.devicesSessionsService.deleteAllDevicesSessionsExceptCurrent(String(req.context.session?._id));
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteDeviceSessionById (req: TypedRequestParams<ParamDeviceSessionIdInputModel>, res: Response<void>) {
		try {
			const deviceId = req.params.deviceId;
			const deletingDeviceSession = await this.devicesSessionsService.getDeviceSessionByFilter({deviceId});
			
			if (!deletingDeviceSession) {
				res.sendStatus(404);
				return;
			}
			
			if (String(deletingDeviceSession.userId) === String(req.context.user!._id)) {
				await this.devicesSessionsService.deleteDeviceSessionById(String(deletingDeviceSession._id));
				res.sendStatus(204);
			} else {
				res.sendStatus(403);
			}
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
