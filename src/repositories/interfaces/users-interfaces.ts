import {ObjectId} from "mongodb";
import { EmailConfirmation } from "../../classes/users";

export interface DbUser {
	_id: ObjectId;
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	emailConfirmation: EmailConfirmation;
	createdAt: Date;
}

export interface UserFilter {
	email?: string;
	passwordHash?: string;
	login?: string;
	confirmationCode?: string;
}
