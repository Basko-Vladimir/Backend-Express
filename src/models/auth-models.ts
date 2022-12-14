export interface LoginInputModel {
	loginOrEmail: string;
	password: string;
}

export interface TokenOutputModel {
	accessToken: string;
}

export interface RegistrationConfirmationInputModel {
	code: string;
}

export interface PasswordRecoveryConfirmationInputModel {
	newPassword: string;
	recoveryCode: string;
}

export interface EmailInputModel {
	email: string;
}

export interface CurrentUserDataOutputModel {
	email: string;
	login: string;
	userId: string;
}
