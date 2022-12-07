import {ObjectId} from "mongodb";

export class Blog {
	_id: ObjectId | null = null;
	name: string;
	websiteUrl: string;
	createdAt: Date;
	
	constructor(name: string, websiteUrl: string) {
		this.name = name;
		this.websiteUrl = websiteUrl;
		this.createdAt = new Date();
	}
}
