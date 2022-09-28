import {Router, Response, Request} from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody} from "../common/interfaces";
import {
	CurrentUserDataOutputModel,
	EmailResendingInputModel,
	LoginInputModel,
	LoginOutputModel,
	RegistrationConfirmationInputModel
} from "../models/auth-models";
import {loginPasswordValidation} from "../middlewares/auth/login-password-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {jwtService} from "../services/jwt-service";
import {authService} from "../services/auth-service";
import {userRequestBodyValidation} from "../middlewares/users/user-request-body-validation";
import {CreateUserInputModel} from "../models/users/input-models";
import {userExistenceValidation} from "../middlewares/user-existence-validation";
import {confirmationCodeValidation} from "../middlewares/auth/confirmation-code-validation";
import {emailValidation} from "../middlewares/auth/email-validation";
import {emailExistenceValidation} from "../middlewares/auth/email-existence-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";

class AuthController {
	async getCurrentUser (req: Request, res: Response<CurrentUserDataOutputModel>) {
		try {
			const currentUser: CurrentUserDataOutputModel = {
				userId: String(req.user!._id),
				email: req.user!.email,
				login: req.user!.login
			};
			res.status(200).send(currentUser);
		} catch (error) {
			res.sendStatus(getErrorStatus(error))
		}
	}
	
	async login (req: TypedRequestBody<LoginInputModel>, res: Response<LoginOutputModel>) {
		try {
			const {login, password} = req.body;
			const userId = await authService.checkCredentials(login, password);
			
			if (userId) {
				const token = await jwtService.createJWT(userId);
				res.status(200).send({accessToken: token});
			} else {
				res.sendStatus(401);
			}
		} catch (err) {
			res.sendStatus(getErrorStatus(err))
		}
	}
	
	async registration (req: TypedRequestBody<CreateUserInputModel>, res: Response<void>) {
		try {
			await authService.registerUser(req.body);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async confirmRegistration (req: TypedRequestBody<RegistrationConfirmationInputModel>, res: Response) {
		try {
			await authService.confirmRegistration(req.user!);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async resendRegistrationEmail (req: TypedRequestBody<EmailResendingInputModel>, res: Response<void>) {
		try {
			await authService.resendRegistrationEmail(req.user!);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}

export const authRouter = Router({});
export const authController = new AuthController();

authRouter.get("/me", bearerAuthValidation, authController.getCurrentUser);
authRouter.post("/login", loginPasswordValidation, requestErrorsValidation, authController.login);

authRouter.post(
	"/registration",
	userRequestBodyValidation,
	userExistenceValidation,
	requestErrorsValidation,
	authController.registration
);

authRouter.post(
	"/registration-confirmation",
	confirmationCodeValidation,
	requestErrorsValidation,
	authController.confirmRegistration
);

authRouter.post(
	"/registration-email-resending",
	emailValidation,
	emailExistenceValidation,
	requestErrorsValidation,
	authController.resendRegistrationEmail
);
