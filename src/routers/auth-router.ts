import { Router, Response } from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestBody} from "../common/interfaces";
import {LoginInputModel} from "../models/auth-models";
import {usersService} from "../services/users-service";
import {loginCredentialsValidation} from "../middlewares/auth/login-credentials-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {jwtService} from "../application/jwt-service";

export const authRouter = Router({});

authRouter.post(
	"/login",
	loginCredentialsValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<LoginInputModel> , res: Response) => {
		try {
			const { login, password } = req.body;
			const userId = await usersService.checkCredentials(login, password);
			
			if (userId) {
				const token = await jwtService.createJWT(userId);
				res.status(200).send(token);
			} else {
				res.sendStatus(401);
			}
		} catch (err) {
			res.sendStatus(getErrorStatus(err))
		}
	});
