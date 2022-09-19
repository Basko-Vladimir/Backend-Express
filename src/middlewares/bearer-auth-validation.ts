import {Request, Response, NextFunction} from "express";
import {iocContainer} from "../composition-root";
import {JwtService} from "../services/jwt-service";
import {UsersService} from "../services/users-service";

const jwtService = iocContainer.resolve(JwtService);
const usersService = iocContainer.resolve(UsersService);

export const bearerAuthValidation = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		res.sendStatus(401);
		return;
	}
	
	const token = req.headers.authorization.split(" ")[1];
	const userId = await jwtService.getUserIdByToken(token);
	
	if (!userId) {
		res.sendStatus(401);
		return;
	}
	
	req.user = await usersService.getUserById(userId);
	next();
};
