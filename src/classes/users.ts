import {ObjectId} from "mongodb";

export class User {
	_id: ObjectId | null = null;
	login: string;
	email: string;
	passwordSalt: string;
	passwordHash: string;
	createdAt: Date;
	
	constructor(login: string, email: string, salt: string, hash: string) {
		this.login = login;
		this.email = email;
		this.passwordSalt = salt;
		this.passwordHash = hash;
		this.createdAt = new Date();
	}
}
