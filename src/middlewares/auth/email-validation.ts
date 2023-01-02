import {body} from "express-validator";
import {generateMissedPropError, generateRegExpError} from "../../common/error-messages";
import {usersConstants} from "../../common/constants";

export const emailValidation = body("email")
	.exists().withMessage(generateMissedPropError("email"))
	.trim()
	.custom(email => {
		const isMatchedEmail = email.match(usersConstants.EMAIL_REG_EXP);
		
		if (!isMatchedEmail) throw new Error(generateRegExpError("email", usersConstants.EMAIL_REG_EXP));
		
		return email;
	});
