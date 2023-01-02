
export class ClientRequest {
	endpoint: string;
	ip: string;
	createTimeStamp: number;
	
	constructor(endpoint: string, ip: string) {
		this.endpoint = endpoint;
		this.ip = ip;
		this.createTimeStamp = Date.now();
	}
}
