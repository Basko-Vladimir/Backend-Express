import {body, Meta} from "express-validator";
import {iocContainer} from "../../composition-root";
import {UsersService} from "../../services/users-service";

const usersService = iocContainer.resolve(UsersService)

export const emailExistenceValidation = body("email")
	.custom(async (email, meta: Meta) => {
		const user = await usersService.getUserByFilter({email});
		
		if (!user) throw new Error(`User with email: ${email} is not found!`);
		if (user.emailConfirmation.isConfirmed) throw new Error(`Provided email ${email} is confirmed already!`);
		
		meta.req.context = {user};
		return email;
	});
