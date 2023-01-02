import {body} from "express-validator";

export const emailValidation = body("email")
	.exists().withMessage("You didn't provide 'email' field")
	.trim()
	.custom(email => {
		const isMatchedEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
		
		if (!isMatchedEmail) throw new Error("Email doesn't match to pattern '^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
		
		return email;
	});
