import {ObjectId} from "mongodb";
import { EmailConfirmation } from "../../../domain/classes/users";

export interface DbUser {
	_id: ObjectId;
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	passwordRecoveryCode: string;
	emailConfirmation: EmailConfirmation;
	createdAt: Date;
	__v: number;
}

export interface UserFilter {
	email?: string;
	passwordHash?: string;
	login?: string;
	confirmationCode?: string;
	passwordRecoveryCode?: string;
}
