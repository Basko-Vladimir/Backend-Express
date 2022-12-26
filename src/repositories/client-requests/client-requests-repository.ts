import {injectable} from "inversify";
import {ClientRequestsModel} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DbSortDirection} from "../interfaces/common-interfaces";
import {DbClientRequest} from "../interfaces/client-requests";
import {ClientRequest} from "../../classes/client-requests";
import {DataBaseError} from "../../classes/errors";
import {UpdateOrFilterModel} from "../../common/interfaces";

@injectable()
export class ClientRequestsRepository {
	
	async getClientRequestsByFilter (
		filter: UpdateOrFilterModel,
		sortFilter: UpdateOrFilterModel<DbSortDirection> = {}
	): Promise<DbClientRequest[]> {
		return ClientRequestsModel
			.find(filter)
			.sort(sortFilter);
	}
	
	async createClientRequest (clientRequest: ClientRequest): Promise<string> {
		const createdClientRequest = await ClientRequestsModel.create(clientRequest);
		
		if (!createdClientRequest) throw new DataBaseError();
		
		return String(createdClientRequest._id);
	}
	
	async updateClientRequest (clientRequestId: string, fields: UpdateOrFilterModel): Promise<void> {
		const { matchedCount } = await ClientRequestsModel.updateOne(
			getFilterByDbId(clientRequestId),
			fields
		);
		
		if (!matchedCount) throw new DataBaseError();
 	}
	 
	 async updateManyClientsRequestsByFilter(
		 filter: UpdateOrFilterModel,
		 fields: UpdateOrFilterModel
	 ) : Promise<void> {
		 const { matchedCount } = await ClientRequestsModel.updateMany(filter, fields);
		
		 if (!matchedCount) throw new DataBaseError();
	 }
	
	async deleteAllClientRequests(): Promise<void> {
		await ClientRequestsModel.deleteMany({});
	}
}
