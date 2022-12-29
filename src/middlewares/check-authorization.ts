import { header, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validCredentials = "Basic YWRtaW46cXdlcnR5";

export const checkAuthorization = [
	header("authorization")
		.exists().bail().withMessage("You are not authorized!")
		.equals(validCredentials).bail().withMessage("Incorrect Login or Password"),
	(req: Request, res: Response, next: NextFunction) => validationResult(req).isEmpty()
		? next()
		: res.status(401).json({ errors: validationResult(req).array() })
]
