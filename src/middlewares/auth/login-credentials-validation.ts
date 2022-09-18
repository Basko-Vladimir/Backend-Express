import {body} from "express-validator";

export const loginCredentialsValidation = [
	body("login").exists().withMessage("You didn't provide 'login' field"),
	body("password").exists().withMessage("You didn't provide 'password' field")
];
