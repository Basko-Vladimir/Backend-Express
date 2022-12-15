import {injectable} from "inversify";
import {clientRequestsCollection} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DbSortDirection} from "../interfaces/common-interfaces";
import {ClientRequest} from "../../classes/client-requests";
import {EntityWithoutId} from "../../common/interfaces";
import {DataBaseError} from "../../classes/errors";

@injectable()
export class ClientRequestsRepository {
	
	async getClientRequestsByFilter (
		filter: {[key: string]: unknown},
		sortFilter: {[key: string]: DbSortDirection} = {}
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
	
	async updateClientRequest (clientRequestId: string, fields: {[key: string]: unknown}): Promise<void> {
		const { matchedCount } = await clientRequestsCollection.updateOne(getFilterByDbId(clientRequestId), {$set: fields});
		
		if (!matchedCount) throw new DataBaseError();
 	}
	
	async deleteAllClientRequests(): Promise<void> {
		await clientRequestsCollection.deleteMany({});
	}
}
