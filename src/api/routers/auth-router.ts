import {Router} from "express";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {userExistenceValidation} from "../middlewares/user-existence-validation";
import {confirmationCodeValidation} from "../middlewares/auth/confirmation-code-validation";
import {emailValidation} from "../middlewares/auth/email-validation";
import {loginDataValidation} from "../middlewares/auth/login-data-validation";
import {emailExistenceValidation} from "../middlewares/auth/email-existence-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {refreshTokenValidation} from "../middlewares/refresh-token-validation";
import {clientRequestsCountValidation} from "../middlewares/auth/client-requests-count-validation";
import {passwordValidation} from "../middlewares/auth/password-validation";
import {passwordRecoveryCodeValidation} from "../middlewares/auth/password-recovery-code-validation";
import {iocContainer} from "../../composition-root";
import {AuthController} from "../controllers/auth-controller";

export const authRouter = Router({});
const authController = iocContainer.resolve(AuthController);

authRouter.get("/me", bearerAuthValidation, authController.getCurrentUser.bind(authController));

authRouter.post(
	"/login",
	clientRequestsCountValidation,
	loginDataValidation,
	requestErrorsValidation,
	authController.login.bind(authController)
);

authRouter.post(
	"/registration",
	clientRequestsCountValidation,
	userRequestBodyValidation,
	userExistenceValidation,
	requestErrorsValidation,
	authController.registration.bind(authController)
);

authRouter.post(
	"/registration-confirmation",
	clientRequestsCountValidation,
	confirmationCodeValidation,
	requestErrorsValidation,
	authController.confirmRegistration.bind(authController)
);

authRouter.post(
	"/registration-email-resending",
	clientRequestsCountValidation,
	emailValidation,
	emailExistenceValidation,
	requestErrorsValidation,
	authController.resendRegistrationEmail.bind(authController)
);

authRouter.post(
	"/refresh-token",
	refreshTokenValidation,
	authController.refreshToken.bind(authController)
);

authRouter.post(
	"/logout",
	refreshTokenValidation,
	authController.logout.bind(authController)
);

authRouter.post(
	"/password-recovery",
	clientRequestsCountValidation,
	emailValidation,
	requestErrorsValidation,
	authController.recoverPassword.bind(authController)
);

authRouter.post(
	"/new-password",
	clientRequestsCountValidation,
	passwordValidation("newPassword"),
	passwordRecoveryCodeValidation,
	requestErrorsValidation,
	authController.confirmPasswordRecovery.bind(authController)
);
