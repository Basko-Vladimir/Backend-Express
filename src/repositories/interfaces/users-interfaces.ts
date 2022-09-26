import {ObjectId} from "mongodb";

export interface DbUser {
	_id: ObjectId;
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	createdAt: Date;
}

export interface UserFilter {
	email?: string;
	passwordHash?: string;
	login?: string
}
