import {body} from "express-validator";
import {
	generateLengthRangeErrorMessage,
	generateMissedPropError
} from "../../common/error-messages";
import {usersConstants} from "../../common/constants";

const { MIN_LOGIN_LENGTH,  MAX_LOGIN_LENGTH } = usersConstants;
export const loginValidation = body("login")
		.exists()
		.withMessage(generateMissedPropError("login"))
		.trim()
		.isLength({min: MIN_LOGIN_LENGTH, max: MAX_LOGIN_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("login", MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH));

