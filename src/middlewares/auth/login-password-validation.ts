import {body} from "express-validator";
import {
	generateLengthRangeErrorMessage,
	generateMissedPropError
} from "../../common/error-messages";
import {usersConstants} from "../../common/constants";

const { MIN_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, MAX_LOGIN_LENGTH } = usersConstants;
export const loginPasswordValidation = [
	body("login")
		.exists()
		.withMessage(generateMissedPropError("login"))
		.trim()
		.isLength({min: MIN_LOGIN_LENGTH, max: MAX_LOGIN_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("login", MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)),
	body("password")
		.exists()
		.withMessage(generateMissedPropError("password"))
		.trim()
		.isLength({min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("password", MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH))
];
