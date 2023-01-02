import { Router, Response } from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody} from "../common/interfaces";
import {LoginInputModel, LoginOutputModel} from "../models/auth-models";
import {loginCredentialsValidation} from "../middlewares/auth/login-credentials-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {jwtService} from "../application/jwt-service";
import {authService} from "../services/auth-service";

export const authRouter = Router({});

authRouter.post(
	"/login",
	loginCredentialsValidation,
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
