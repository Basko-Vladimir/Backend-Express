import {ValidationError, validationResult} from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validationRequestErrors = (req: Request, res: Response, next: NextFunction) => {
	const errorFormatter = ({ msg, param }: ValidationError) => ({message: msg, field: param});
	const errors = validationResult(req).formatWith(errorFormatter);
	
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	} else {
		next();
	}
}