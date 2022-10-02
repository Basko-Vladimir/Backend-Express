import {Request, Response} from "express";
import {getErrorStatus} from "./utils";
import {TestingService} from "../services/testing-service";

export class TestingController {
	constructor(
		protected testingService: TestingService
	) {}
	
	async deleteAllData(req: Request, res: Response<number>) {
		try {
			await this.testingService.deleteAllData();
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
