import { body } from "express-validator";
import {iocContainer} from "../../composition-root";
import {UsersService} from "../../application/services/users-service";

const usersService = iocContainer.resolve(UsersService);

export const userExistenceValidation = [
	body("email").custom(async email => {
		const user = await usersService.getUserByFilter({email});

		if (user) throw new Error("User with passed email exists already!");

		return email;
	}),
	body("login").custom(async login => {
		const user = await usersService.getUserByFilter({login});
		
		if (user) throw new Error("User with passed login exists already!");
		
		return login;
	})
];
