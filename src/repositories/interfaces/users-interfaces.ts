import {ObjectId} from "mongodb";

export interface DbUser {
	_id: ObjectId;
	login: string;
	email: string;
	createdAt: Date;
}
