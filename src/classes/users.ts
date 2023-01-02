import { v4 as uuidv4 } from "uuid";
import add from "date-fns/add";

export class EmailConfirmation {
	confirmationCode: string;
	expirationDate: Date;
	isConfirmed: boolean = false;
	
	constructor() {
		this.confirmationCode = uuidv4();
		this.expirationDate = add(new Date(), {hours: 1});
		this.isConfirmed = false;
	}
}

export class User {
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	passwordRecoveryCode?: string;
	emailConfirmation: EmailConfirmation;
	createdAt: Date;
	
	constructor(login: string, email: string, salt: string, hash: string) {
		this.login = login;
		this.email = email;
		this.passwordSalt = salt;
		this.passwordHash = hash;
		this.emailConfirmation = new EmailConfirmation();
		this.createdAt = new Date();
	}
}
