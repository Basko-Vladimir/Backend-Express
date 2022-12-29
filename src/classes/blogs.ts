import {ObjectId} from "mongodb";

export class Blog {
	_id: ObjectId | null = null;
	name: string;
	youtubeUrl: string;
	createdAt: Date;
	
	constructor(name: string, youtubeUrl: string) {
		this.name = name;
		this.youtubeUrl = youtubeUrl;
		this.createdAt = new Date();
	}
}
