import {Router} from "express";
import {iocContainer} from "../composition-root";
import {TestingController} from "../controllers/testing-controller";

export const testingRouter = Router({});
const testingController = iocContainer.resolve(TestingController);

testingRouter.delete("/all-data", testingController.deleteAllData.bind(testingController));
