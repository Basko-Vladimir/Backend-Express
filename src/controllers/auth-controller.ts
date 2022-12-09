import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {
	CurrentUserDataOutputModel, EmailResendingInputModel,
	LoginInputModel,
	LoginOutputModel,
	RegistrationConfirmationInputModel
} from "../models/auth-models";
import {getErrorStatus} from "./utils";
import {TypedRequestBody} from "../common/interfaces";
import {AuthService} from "../services/auth-service";
import {JwtService} from "../services/jwt-service";
import {CreateUserInputModel} from "../models/users/input-models";

@injectable()
export class AuthController {
	constructor(
		@inject(AuthService) protected authService: AuthService,
		@inject(JwtService) protected jwtService: JwtService
	) {}
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
			const userId = await this.authService.checkCredentials(login, password);
			
			if (userId) {
				const accessToken = await this.jwtService.createJWT(userId, "10s");
				const refreshToken = await this.jwtService.createJWT(userId, "20s");
				
				res
					.status(200)
					.cookie("refreshToken ", refreshToken, {httpOnly: true, secure: true})
					.send({accessToken: accessToken});
			} else {
				res.sendStatus(401);
			}
		} catch (err) {
			res.sendStatus(getErrorStatus(err))
		}
	}
	
	async registration (req: TypedRequestBody<CreateUserInputModel>, res: Response<void>) {
		try {
			await this.authService.registerUser(req.body);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async confirmRegistration (req: TypedRequestBody<RegistrationConfirmationInputModel>, res: Response) {
		try {
			await this.authService.confirmRegistration(req.user!);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async resendRegistrationEmail (req: TypedRequestBody<EmailResendingInputModel>, res: Response<void>) {
		try {
			await this.authService.resendRegistrationEmail(req.user!);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}