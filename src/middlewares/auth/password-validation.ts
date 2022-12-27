import {body, validationResult} from "express-validator";
import {generateLengthRangeErrorMessage, generateMissedPropError} from "../../common/error-messages";
import {usersConstants} from "../../common/constants";
import {NextFunction, Request, Response} from "express";

const { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } = usersConstants;
export const passwordValidation = (password: string) => (req: Request, res: Response, next: NextFunction) => {
	body(password)
		.exists()
		.withMessage(generateMissedPropError(password))
		.trim()
		.isLength({min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH})
		.withMessage(generateLengthRangeErrorMessage(password, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH));
	
	return validationResult(req).isEmpty()
		? next()
		: res.status(400).json({ errors: validationResult(req).array()})
};
