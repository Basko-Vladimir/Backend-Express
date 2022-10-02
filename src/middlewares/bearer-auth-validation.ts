import {Request, Response, NextFunction} from "express";
import {jwtService, usersService} from "../composition-root";

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
