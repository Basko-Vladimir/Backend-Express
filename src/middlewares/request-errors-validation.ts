import {ValidationError, validationResult} from "express-validator";
import {Request, NextFunction, Response} from "express";
import {ErrorModel} from "../models/errors-models";

export const requestErrorsValidation = (req: Request, res: Response, next: NextFunction) => {
	const errorFormatter = ({ msg, param }: ValidationError): ErrorModel => ({message: msg, field: param});
	const errors = validationResult(req).formatWith(errorFormatter);
	
	if (errors.isEmpty()) {
		next();
	} else {
		res.status(400).json({ errorsMessages: errors.array({onlyFirstError: true}) });
	}
};
