import {Request, Response, NextFunction} from "express";
import {iocContainer} from "../../composition-root";
import {ClientRequestsService} from "../../services/client-requests-service";
import {ClientRequestSortByField} from "../../models/enums";
import {DbSortDirection} from "../../repositories/interfaces/common-interfaces";

const clientRequestsService = iocContainer.resolve(ClientRequestsService);

const TIME_LIMIT = 10000;
const COUNT_LIMIT = 5;

export const clientRequestsCountValidation = async (req: Request, res: Response, next: NextFunction) => {
	const endpoint = req.originalUrl;
	const ip = req.ip;
	const sortFilter = {[ClientRequestSortByField.createTimeStamp as string]: DbSortDirection.ASC};
	const clientRequests = await clientRequestsService.getClientRequestsByFilter({endpoint, ip}, sortFilter);
	const timeBetweenLastFirstRequests =
		clientRequests[clientRequests.length - 1].createTimeStamp - clientRequests[0].createTimeStamp;
	
	if (clientRequests.length >= COUNT_LIMIT) {
		await clientRequestsService.updateClientRequest(
			String(clientRequests[0]._id),
			{[ClientRequestSortByField.createTimeStamp]: Date.now()}
		);
		
		if (timeBetweenLastFirstRequests < TIME_LIMIT) {
			res.sendStatus(429);
			return;
		}
	} else {
		await clientRequestsService.createClientRequest(endpoint, ip);
	}
	
	next();
};
