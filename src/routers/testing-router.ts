import { Request, Response, Router } from "express";
import { memoryTestingRepository } from "../repositories/testing/memory-testing-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
	memoryTestingRepository.deleteAllData();
	res.status(204).send("All data is deleted");
});
