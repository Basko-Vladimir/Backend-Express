import {body} from "express-validator";
import { generateMissedPropError } from "../../common/error-messages";

export const loginDataValidation = [
	body("loginOrEmail").exists().withMessage(generateMissedPropError("loginOrEmail")),
	body("password").exists().withMessage(generateMissedPropError("password"))
];
