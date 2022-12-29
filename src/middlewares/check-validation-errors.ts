import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const checkValidationErrors = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		res.status(401).json({ errors: errors.array() });
	} else {
		next();
	}
}