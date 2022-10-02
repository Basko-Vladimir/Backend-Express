import {Router} from "express";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";
import {usersController} from "../composition-root";

export const usersRouter = Router({});

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
