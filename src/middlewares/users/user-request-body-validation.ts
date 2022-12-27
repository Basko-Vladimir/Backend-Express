import {loginValidation} from "../auth/login-validation";
import {emailValidation} from "../auth/email-validation";
import {passwordValidation} from "../auth/password-validation";

export const userRequestBodyValidation = [
	loginValidation,
	passwordValidation("password"),
	emailValidation
].flat();
