import {Request, Response, NextFunction} from "express";
import {iocContainer} from "../../composition-root";
import { UsersService } from "../../services/users-service";
import {JwtService} from "../../services/jwt-service";

const jwtService = iocContainer.resolve(JwtService);
const usersService = iocContainer.resolve(UsersService);

export const refreshTokenValidation = async (req: Request, res: Response, next: NextFunction) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		res.sendStatus(401);
		return;
	}

	const userId = await jwtService.getUserIdByToken(refreshToken);

	if (!userId) {
		res.sendStatus(401);
		return;
	}
	
	const user = await usersService.getUserById(userId);
	
	if (!user || user.refreshToken !== refreshToken) {
		res.sendStatus(401);
		return;
	}
	
	req.user = user;
	next();
};
