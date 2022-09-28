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
