export interface UserFilter {
	email?: string;
	passwordHash?: string;
	login?: string;
	"emailConfirmation.confirmationCode"?: string;
	passwordRecoveryCode?: string;
}
