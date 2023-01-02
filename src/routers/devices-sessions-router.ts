import {Router} from "express";
import {iocContainer} from "../composition-root";
import {DevicesSessionsController} from "../controllers/devices-sessions-controller";
import {refreshTokenValidation} from "../middlewares/refresh-token-validation";

export const devicesSessionsRouter = Router({});
const devicesSessionsController = iocContainer.resolve(DevicesSessionsController);

devicesSessionsRouter.get(
	"/devices",
	refreshTokenValidation,
	devicesSessionsController.getAllActiveDevicesSessions.bind(devicesSessionsController)
);

devicesSessionsRouter.delete(
	"/devices",
	refreshTokenValidation,
	devicesSessionsController.deleteAllDevicesSessionsExceptCurrent.bind(devicesSessionsController)
);

devicesSessionsRouter.delete(
	"/devices/:deviceId",
	refreshTokenValidation,
	devicesSessionsController.deleteDeviceSessionById.bind(devicesSessionsController)
);
