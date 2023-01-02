export interface LoginInputModel {
	login: string;
	password: string;
}

export interface LoginOutputModel {
	accessToken: string;
}

export interface RegistrationConfirmationInputModel {
	code: string;
}

export interface EmailResendingInputModel {
	email: string;
}

export interface CurrentUserDataOutputModel {
	email: string;
	login: string;
	userId: string;
}
