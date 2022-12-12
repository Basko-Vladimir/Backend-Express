import {injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus} from "../controllers/utils";

@injectable()
export class DevicesSessionsService {
	constructor(
	
	) {}
	
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
