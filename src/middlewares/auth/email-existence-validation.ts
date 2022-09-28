import {body, Meta} from "express-validator";
import {usersService} from "../../services/users-service";

export const emailExistenceValidation = body("email")
	.custom(async (email, meta: Meta) => {
		const user = await usersService.getUserByFilter({email});
		
		if (!user) throw new Error(`User with email: ${email} is not found!`);
		if (user.emailConfirmation.isConfirmed) throw new Error(`Provided email ${email} is confirmed already!`);
		
		meta.req.user = user;
		return email;
	});
