import {ValidationError, validationResult} from "express-validator";
import {Request, NextFunction, Response} from "express";
import {ApiErrorOutputModel} from "../models/errors-models";
import { ApiError } from "../../common/errors/errors-types";

export const requestErrorsValidation = (req: Request, res: Response, next: NextFunction) => {
	const errorFormatter = ({ msg, param }: ValidationError): ApiErrorOutputModel => new ApiError(msg, param);
	const errors = validationResult(req).formatWith(errorFormatter);
	
	if (errors.isEmpty()) {
		next();
	} else {
		res.status(400).json({ errorsMessages: errors.array({onlyFirstError: true})});
	}
};
