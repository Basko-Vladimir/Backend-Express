import {body} from "express-validator";

export const loginDataValidation = [
	body("loginOrEmail").exists().withMessage("You didn't provide 'loginOrEmail' field"),
	body("password").exists().withMessage("You didn't provide 'password' field")
];
