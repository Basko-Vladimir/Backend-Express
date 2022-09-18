import {ObjectId} from "mongodb";

export class User {
	_id: ObjectId | null = null;
	login: string;
	email: string;
	createdAt: Date;
	
	constructor(login: string, email: string) {
		this.login = login;
		this.email = email;
		this.createdAt = new Date();
	}
}
