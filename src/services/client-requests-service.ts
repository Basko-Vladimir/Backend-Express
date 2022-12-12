import {inject, injectable} from "inversify";
import {ClientRequest} from "../classes/client-requests";
import {ClientRequestsRepository} from "../repositories/client-requests/client-requests-repository";
import {DbSortDirection} from "../repositories/interfaces/common-interfaces";

@injectable()
export class ClientRequestsService {
	constructor(
		@inject(ClientRequestsRepository) protected clientRequestsRepository: ClientRequestsRepository
	) {}
	
	async getClientRequestsByFilter (
		filter: {[key: string]: unknown},
		sortFilter: {[key: string]: DbSortDirection}
	): Promise<ClientRequest[]> {
		return this.clientRequestsRepository.getClientRequestsByFilter(filter, sortFilter)
	}
	
	async createClientRequest (endpoint: string, ip: string): Promise<string> {
		const newClientRequest = new ClientRequest(endpoint, ip);
		
		return this.clientRequestsRepository.createClientRequest(newClientRequest);
	}
	
	async updateClientRequest (clientRequestId: string, fields: {[key: string]: unknown}): Promise<void> {
		return this.clientRequestsRepository.updateClientRequest(clientRequestId, fields);
	}
}
