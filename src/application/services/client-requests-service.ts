import {inject, injectable} from "inversify";
import {ClientRequest} from "../../domain/entities/client-requests";
import {ClientRequestsRepository} from "../../infrastructure/repositories/client-requests/client-requests-repository";
import {DbSortDirection} from "../../infrastructure/repositories/interfaces/common-interfaces";
import {DbClientRequest} from "../../infrastructure/repositories/interfaces/client-requests-interfaces";
import {UpdateOrFilterModel} from "../../common/interfaces";

@injectable()
export class ClientRequestsService {
	constructor(
		@inject(ClientRequestsRepository) protected clientRequestsRepository: ClientRequestsRepository
	) {}
	
	async getClientRequestsByFilter (
		filter: UpdateOrFilterModel,
		sortFilter: UpdateOrFilterModel<DbSortDirection>
	): Promise<DbClientRequest[]> {
		return this.clientRequestsRepository.getClientRequestsByFilter(filter, sortFilter)
	}
	
	async createClientRequest (endpoint: string, ip: string): Promise<string> {
		const newClientRequest = new ClientRequest(endpoint, ip);
		
		return this.clientRequestsRepository.createClientRequest(newClientRequest);
	}
	
	async updateClientRequest (clientRequestId: string, fields: UpdateOrFilterModel): Promise<void> {
		return this.clientRequestsRepository.updateClientRequest(clientRequestId, fields);
	}
	
	async updateManyClientsRequestsByFilter(
		filter: UpdateOrFilterModel,
		fields: UpdateOrFilterModel
	): Promise<void> {
		return this.clientRequestsRepository.updateManyClientsRequestsByFilter(filter, fields);
	}
	
	async deleteAllClientRequests(): Promise<void> {
		return this.clientRequestsRepository.deleteAllClientRequests();
	}
}
