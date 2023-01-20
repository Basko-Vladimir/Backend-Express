import {Request, Response} from "express";
import {getErrorStatus} from "./utils";
import {TestingService} from "../../application/services/testing-service";
import {inject, injectable} from "inversify";

@injectable()
export class TestingController {
	constructor(
		@inject(TestingService) protected testingService: TestingService
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
