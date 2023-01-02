import {body} from "express-validator";

export const loginPasswordValidation = [
	body("login")
		.exists().withMessage("You didn't provide 'login' field")
		.trim().isLength({min: 3, max: 10}).withMessage("Login should be from 3 to 10 chars"),
	body("password")
		.exists().withMessage("You didn't provide 'password' field")
		.trim().isLength({min: 6, max: 20}).withMessage("Password should be from 6 to 20 chars"),
];
