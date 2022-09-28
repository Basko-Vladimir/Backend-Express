import {Request, Response, Router} from "express";
import {testingService} from "../services/testing-service";
import { getErrorStatus } from "./utils";

class TestingController {
	async deleteAllData(req: Request, res: Response<number>) {
		try {
			await testingService.deleteAllData();
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}

export const testingRouter = Router({});
export const testingController = new TestingController();

testingRouter.delete("/all-data", testingController.deleteAllData);
