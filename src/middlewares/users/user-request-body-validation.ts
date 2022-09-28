import {loginPasswordValidation} from "../auth/login-password-validation";
import {emailValidation} from "../auth/email-validation";

export const userRequestBodyValidation = [
	loginPasswordValidation,
	emailValidation
].flat();
