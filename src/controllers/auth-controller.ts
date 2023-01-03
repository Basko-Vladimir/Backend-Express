import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {JwtPayload} from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import {getErrorStatus} from "./utils";
import {
	CurrentUserDataOutputModel,
	EmailInputModel,
	LoginInputModel,
	TokenOutputModel,
	RegistrationConfirmationInputModel,
	PasswordRecoveryConfirmationInputModel
} from "../models/auth-models";
import {CreateUserInputModel} from "../models/users/input-models";
import {AuthService} from "../services/auth-service";
import {JwtService} from "../services/jwt-service";
import {EntityWithoutId, TypedRequestBody} from "../common/interfaces";
import {DeviceSession} from "../classes/devices-sessions";

@injectable()
export class AuthController {
	constructor(
		@inject(AuthService) protected authService: AuthService,
		@inject(JwtService) protected jwtService: JwtService
	) {}
	async getCurrentUser (req: Request, res: Response<CurrentUserDataOutputModel>) {
		try {
			const { user } = req.context;
			const currentUser: CurrentUserDataOutputModel = {
				userId: String(user!._id),
				email: user!.email,
				login: user!.login
			};
			res.status(200).send(currentUser);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async login (req: TypedRequestBody<LoginInputModel>, res: Response<TokenOutputModel>) {
		try {
			const {loginOrEmail, password} = req.body;
			const userId = await this.authService.checkCredentials(loginOrEmail, password);
			const deviceId = uuidv4();
			
			if (userId) {
				const { accessToken, refreshToken } = await this
					.createNewTokensPair({userId}, "10m", {userId, deviceId}, "1h");
				
				const refreshTokenPayload = await this.jwtService.getTokenPayload(refreshToken);
				
				const deviceSessionData: EntityWithoutId<DeviceSession> = {
					issuedAt: refreshTokenPayload?.iat,
					expiredDate: refreshTokenPayload?.exp,
					deviceId: refreshTokenPayload!.deviceId,
					deviceName: req.headers["user-agent"],
					ip: req.ip,
					userId: new ObjectId(userId)
				};
				
				await this.authService.createDeviceSession(deviceSessionData);
				
				res
					.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true})
					.status(200)
					.send({accessToken: accessToken});
			} else {
				res.sendStatus(401);
			}
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
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
			await this.authService.confirmRegistration(req.context.user!);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async resendRegistrationEmail (req: TypedRequestBody<EmailInputModel>, res: Response<void>) {
		try {
			await this.authService.resendRegistrationEmail(req.context.user!);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async refreshToken (req:Request, res: Response<TokenOutputModel>) {
		try {
			const { user, session } = req.context;
			const userId = String(user!._id);
			const sessionId = session!._id;
			const { accessToken, refreshToken } = await this
				.createNewTokensPair({userId}, "10m", {userId, deviceId: session!.deviceId}, "1h");
			const refreshTokenPayload = await this.jwtService.getTokenPayload(refreshToken);
			
			await this.authService.updateDeviceSessionData(String(sessionId!), refreshTokenPayload?.iat!);
			
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
			await this.authService.logout(String(req.context.session!._id));
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async recoverPassword (req: TypedRequestBody<EmailInputModel>, res: Response<void>) {
		try {
			await this.authService.recoverPassword(req.body.email);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async confirmPasswordRecovery (req: TypedRequestBody<PasswordRecoveryConfirmationInputModel>, res: Response<void>) {
		try {
			await this.authService.confirmPasswordRecovery(req.context.user!, req.body);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	private async createNewTokensPair (
		accessTokenPayload: JwtPayload,
		accessTokenLifetime: string,
		refreshTokenPayload: JwtPayload,
		refreshTokenLifetime: string
	): Promise<{accessToken: string, refreshToken: string}> {
		const accessToken = await this.jwtService.createJWT(
			{...accessTokenPayload, iat: Date.now()}, accessTokenLifetime
		);
		const refreshToken = await this.jwtService.createJWT(
			{...refreshTokenPayload, iat: Date.now()}, refreshTokenLifetime
		);
		
		return {accessToken, refreshToken};
	}
}
