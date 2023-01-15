import {Request, Response, NextFunction} from "express";
import {iocContainer} from "../../composition-root";
import { UsersService } from "../../application/services/users-service";
import {JwtService} from "../../application/services/jwt-service";
import {DevicesSessionsService} from "../../application/services/devices-sessions-service";

const jwtService = iocContainer.resolve(JwtService);
const usersService = iocContainer.resolve(UsersService);
const deviceSessionService = iocContainer.resolve(DevicesSessionsService);

export const refreshTokenValidation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		
		if (!refreshToken) {
			res.sendStatus(401);
			return;
		}
		
		const tokenPayload = await jwtService.getTokenPayload(refreshToken);
		const currentDeviceSession = await deviceSessionService
			.getDeviceSessionByFilter({deviceId: tokenPayload?.deviceId, issuedAt: tokenPayload?.iat});
		
		
		if (!tokenPayload || !currentDeviceSession) {
			res.sendStatus(401);
			return;
		}
		
		const user = await usersService.getUserById(tokenPayload.userId);
		
		req.context = {user, session: currentDeviceSession};
		next();
	} catch (error) {
		res.status(500).send(error);
	}
};
