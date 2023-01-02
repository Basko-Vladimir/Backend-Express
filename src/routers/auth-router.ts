import { Router, Response } from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody} from "../common/interfaces";
import {LoginInputModel} from "../models/auth-models";
import {usersService} from "../services/users-service";
import {loginCredentialsValidation} from "../middlewares/auth/login-credentials-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";

export const authRouter = Router({});

authRouter.post(
	"/login",
	loginCredentialsValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<LoginInputModel> , res: Response) => {
		try {
			const { login, password } = req.body;
			const isCorrectCredentials = await usersService.checkCredentials(login, password);
			res.sendStatus(isCorrectCredentials ? 204 : 401);
		} catch (err) {
			res.sendStatus(getErrorStatus(err))
		}
	});
