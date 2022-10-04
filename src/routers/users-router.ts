import {Router} from "express";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";
import {iocContainer} from "../composition-root";
import {UsersController} from "../controllers/users-controller";

export const usersRouter = Router({});
const usersController = iocContainer.resolve(UsersController);

usersRouter.get("/", commonQueryParamsSanitization, usersController.getAllUsers.bind(usersController));

usersRouter.post(
	"/",
	basicAuthValidation,
	userRequestBodyValidation,
	requestErrorsValidation,
	usersController.createUser.bind(usersController)
);

usersRouter.delete(
	"/:id",
	basicAuthValidation,
	requestErrorsValidation,
	usersController.deleteUser.bind(usersController)
);
