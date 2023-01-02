export class Blog {
	name: string;
	websiteUrl: string;
	description: string;
	createdAt: Date;
	
	constructor(name: string, websiteUrl: string, description: string) {
		this.name = name;
		this.websiteUrl = websiteUrl;
		this.description = description;
		this.createdAt = new Date();
	}
}
