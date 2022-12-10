import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {
	CurrentUserDataOutputModel, EmailResendingInputModel,
	LoginInputModel,
	TokenOutputModel,
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
	
	async login (req: TypedRequestBody<LoginInputModel>, res: Response<TokenOutputModel>) {
		try {
			const {login, password} = req.body;
			const userId = await this.authService.checkCredentials(login, password);
			
			if (userId) {
				const { accessToken, refreshToken } = await this.updateTokens(userId, "10s", "20s");
				
				res
					.cookie("refreshToken ", refreshToken, {httpOnly: true, secure: true})
					.status(200)
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
	
	async refreshToken (req:Request, res: Response<TokenOutputModel>) {
		try {
			const userId = String(req.user!._id);
			const { accessToken, refreshToken } = await this.updateTokens(userId, "10s", "20s");
			
			res
				.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true})
				.status(200)
				.send({accessToken: accessToken});
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async logout (req: Request, res: Response<void>) {
		try {
			await this.authService.updateUserRefreshToken(String(req.user!._id), null);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	private async updateTokens (
		userId: string,
		accessTokenLifetime: string,
		refreshTokenLifetime: string
	): Promise<{accessToken: string, refreshToken: string}> {
		const accessToken = await this.jwtService.createJWT(userId, accessTokenLifetime);
		const refreshToken = await this.jwtService.createJWT(userId, refreshTokenLifetime);
		
		await this.authService.updateUserRefreshToken(userId, refreshToken);
		
		return { accessToken, refreshToken };
	}
}
