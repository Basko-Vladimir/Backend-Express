import { body } from "express-validator";
import {usersService} from "../services/users-service";
import {authService} from "../services/auth-service";


export const userExistenceValidation = body()
	.custom(async user => {
		const foundUser = await usersService.getUserByFilter({
			login: user.login,
			email: user.email
		});
		
		if (foundUser) throw new Error("User with passed email or login exists already!");
		
		return user;
	});
