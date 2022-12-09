import {injectable} from "inversify";
import {clientRequestsCollection} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DbSortDirection} from "../interfaces/common-interfaces";
import {ClientRequest} from "../../classes/client-requests";
import {EntityWithoutId, UpdateOrFilterModel} from "../../common/interfaces";
import {DataBaseError} from "../../classes/errors";

@injectable()
export class ClientRequestsRepository {
	
	async getClientRequestsByFilter (
		filter: UpdateOrFilterModel,
		sortFilter: UpdateOrFilterModel<DbSortDirection> = {}
	): Promise<ClientRequest[]> {
		return clientRequestsCollection
			.find(filter)
			.sort(sortFilter)
			.toArray();
	}
	
	async createClientRequest (clientRequest: EntityWithoutId<ClientRequest>): Promise<string> {
		const { insertedId } = await clientRequestsCollection.insertOne(clientRequest);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	}
	
	async updateClientRequest (clientRequestId: string, fields: UpdateOrFilterModel): Promise<void> {
		const { matchedCount } = await clientRequestsCollection.updateOne(getFilterByDbId(clientRequestId), {$set: fields});
		
		if (!matchedCount) throw new DataBaseError();
 	}
	 
	 async updateManyClientsRequestsByFilter(
		 filter: UpdateOrFilterModel,
		 fields: UpdateOrFilterModel
	 ) : Promise<void> {
		 const { matchedCount } = await clientRequestsCollection.updateMany(filter, {$set: fields});
		
		 if (!matchedCount) throw new DataBaseError();
	 }
	
	async deleteAllClientRequests(): Promise<void> {
		await clientRequestsCollection.deleteMany({});
	}
}
