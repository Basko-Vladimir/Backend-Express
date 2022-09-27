import {body, Meta} from "express-validator";
import {usersRepository} from "../../repositories/users/users-repository";

export const confirmationCodeValidation = body("code")
	.exists().withMessage("You didn't provide confirmation code!")
	.custom(async (code, meta: Meta) => {
		const user = await usersRepository.getUserByFilter({confirmationCode: code});
		const isMatchedCode = user && user.emailConfirmation.confirmationCode === code;
		
		if (isMatchedCode && user.emailConfirmation.isConfirmed) throw new Error("Confirmation code is confirmed already!");
		if (!isMatchedCode) throw new Error("Confirmation code is not valid!");
		
		meta.req.user = user;
		return code;
	});
