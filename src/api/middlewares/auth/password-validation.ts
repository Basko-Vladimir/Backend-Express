import {body, } from "express-validator";
import {generateLengthRangeErrorMessage, generateMissedPropError} from "../../../common/errors/error-messages";
import {usersConstants} from "../../../common/constants";

const { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } = usersConstants;
export const passwordValidation = (password: string) => {
	return body(password)
		.exists()
		.withMessage(generateMissedPropError(password))
		.trim()
		.isLength({min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH})
		.withMessage(generateLengthRangeErrorMessage(password, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH));
};
