import {Router} from "express";
import {loginPasswordValidation} from "../middlewares/auth/login-password-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {userExistenceValidation} from "../middlewares/user-existence-validation";
import {confirmationCodeValidation} from "../middlewares/auth/confirmation-code-validation";
import {emailValidation} from "../middlewares/auth/email-validation";
import {emailExistenceValidation} from "../middlewares/auth/email-existence-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {iocContainer} from "../composition-root";
import {AuthController} from "../controllers/auth-controller";

export const authRouter = Router({});
const authController = iocContainer.resolve(AuthController);

authRouter.get("/me", bearerAuthValidation, authController.getCurrentUser.bind(authController));

authRouter.post(
	"/login",
	loginPasswordValidation,
	requestErrorsValidation,
	authController.login.bind(authController));

authRouter.post(
	"/registration",
	userRequestBodyValidation,
	userExistenceValidation,
	requestErrorsValidation,
	authController.registration.bind(authController)
);

authRouter.post(
	"/registration-confirmation",
	confirmationCodeValidation,
	requestErrorsValidation,
	authController.confirmRegistration.bind(authController)
);

authRouter.post(
	"/registration-email-resending",
	emailValidation,
	emailExistenceValidation,
	requestErrorsValidation,
	authController.resendRegistrationEmail.bind(authController)
);
