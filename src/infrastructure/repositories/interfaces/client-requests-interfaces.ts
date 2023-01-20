import {ObjectId} from "mongodb";

export interface DbClientRequest {
	_id: ObjectId;
	endpoint: string;
	ip: string;
	createTimeStamp: number;
	__v: number;
}
