import {Request, Response, NextFunction} from "express";
import {header, validationResult} from "express-validator";

const validCredentials = "Basic YWRtaW46cXdlcnR5";

export const checkAuthorization = [
	header("authorization")
		.exists().bail().withMessage("You are not authorized!")
		.equals(validCredentials).withMessage("Incorrect Login or Password"),
	(req: Request, res: Response, next: NextFunction) => validationResult(req).isEmpty()
		? next()
		: res.status(401).json({ errors: validationResult(req).array() })
];
