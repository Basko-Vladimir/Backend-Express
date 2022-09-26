import { body } from "express-validator";
import {usersService} from "../services/users-service";
import {authService} from "../services/auth-service";


export const userExistenceValidation = body()
	.custom(async user => {
		const foundUser = await usersService.getUserByFilter({login: user.login});
		const errorMessage = "User with passed email, password or login exists already!";
		let passwordHash;
		
		if (foundUser) {
			passwordHash = await authService.generateHash(user.password, foundUser.passwordSalt);
			const existingUser = await usersService.getUserByFilter({
				email: foundUser.email,
				passwordHash
			})
			
			if (existingUser) {
				throw new Error(errorMessage);
			}
		
			return user;
		}
		
		return user;
	});
