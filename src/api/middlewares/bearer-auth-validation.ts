import {Request, Response, NextFunction} from "express";
import {iocContainer} from "../../composition-root";
import {JwtService} from "../../application/services/jwt-service";
import {UsersService} from "../../application/services/users-service";

const jwtService = iocContainer.resolve(JwtService);
const usersService = iocContainer.resolve(UsersService);

export const bearerAuthValidation = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		res.sendStatus(401);
		return;
	}
	
	try {
		const token = req.headers.authorization.split(" ")[1];
		const tokenPayload = await jwtService.getTokenPayload(token);
		
		if (!tokenPayload) {
			res.sendStatus(401);
			return;
		}
		
		const user = await usersService.getUserById(tokenPayload.userId);
		
		if (!user) {
			res.sendStatus(401);
			return;
		}
		
		req.context = {user};
		next();
	} catch (error) {
		console.error(error);
	}
};
