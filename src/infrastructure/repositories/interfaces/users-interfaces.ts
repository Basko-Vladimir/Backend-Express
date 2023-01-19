import {ObjectId} from "mongodb";
import { IEmailConfirmation } from "../../../domain/users/UserTypes";

export interface DbUser {
	_id: ObjectId;
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	passwordRecoveryCode: string;
	emailConfirmation: IEmailConfirmation;
	createdAt: Date;
	__v: number;
}

export interface UserFilter {
	email?: string;
	passwordHash?: string;
	login?: string;
	"emailConfirmation.confirmationCode"?: string;
	passwordRecoveryCode?: string;
}
