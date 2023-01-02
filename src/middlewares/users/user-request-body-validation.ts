import { body } from "express-validator";

export const userRequestBodyValidation = [
	body("login")
		.exists().withMessage("You didn't provide 'login' field")
		.trim().isLength({min: 3, max: 10}).withMessage("Login should be from 3 to 10 chars"),
	body("password")
		.exists().withMessage("You didn't provide 'password' field")
		.trim().isLength({min: 6, max: 20}).withMessage("Password should be from 6 to 20 chars"),
	body("email")
		.exists().withMessage("You didn't provide 'email' field")
		.custom(email => {
			const isMatchedEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
			
			if (!isMatchedEmail) throw new Error("Email doesn't match to pattern '^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
			
			return email;
		})
];
