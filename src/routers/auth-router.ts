import {Router, Response} from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody} from "../common/interfaces";
import {
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

export const authRouter = Router({});

authRouter.post(
	"/login",
	loginPasswordValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<LoginInputModel> , res: Response<LoginOutputModel>) => {
		try {
			const { login, password } = req.body;
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
	});

authRouter.post(
	"/registration",
	userRequestBodyValidation,
	userExistenceValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<CreateUserInputModel>, res: Response<void>) => {
		try {
			await authService.registerUser(req.body);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

authRouter.post(
	"/registration-confirmation",
	confirmationCodeValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<RegistrationConfirmationInputModel>, res: Response) => {
		try {
			await authService.confirmRegistration(req.user!);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

authRouter.post(
	"/registration-email-resending",
	emailValidation,
	emailExistenceValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<EmailResendingInputModel>, res: Response<void>) => {
		try {
			await authService.resendRegistrationEmail(req.user!);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});
