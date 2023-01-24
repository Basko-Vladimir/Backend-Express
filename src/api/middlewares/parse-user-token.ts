import {NextFunction, Request, Response} from "express";
import {iocContainer} from "../../composition-root";
import {JwtService} from "../../application/services/jwt-service";
import {UsersService} from "../../application/services/users-service";

const jwtService = iocContainer.resolve(JwtService);
const usersService = iocContainer.resolve(UsersService);

export const parseUserToken = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];
	const tokenPayload = token && await jwtService.getTokenPayload(token);
	const user = tokenPayload && await usersService.getUserById(tokenPayload.userId);
	
	user ? req.context = {user} : req.context = {user: null}
	next();
};
