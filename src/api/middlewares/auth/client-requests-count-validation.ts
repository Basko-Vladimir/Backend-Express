import {Request, Response, NextFunction} from "express";
import {iocContainer} from "../../../composition-root";
import {ClientRequestsService} from "../../../application/services/client-requests-service";
import {ClientRequestSortByField} from "../../../common/enums";
import {DbSortDirection} from "../../../infrastructure/repositories/interfaces/common-interfaces";
import {getErrorStatus} from "../../controllers/utils";

const clientRequestsService = iocContainer.resolve(ClientRequestsService);

const TIME_LIMIT = 10000;
const COUNT_LIMIT = 5;

export const clientRequestsCountValidation = async (req: Request, res: Response, next: NextFunction) => {
	const endpoint = req.originalUrl;
	const ip = req.ip;
	const sortFilter = {[ClientRequestSortByField.createTimeStamp as string]: DbSortDirection.ASC};
	try {
		const clientRequests = await clientRequestsService.getClientRequestsByFilter({endpoint, ip}, sortFilter);
		const currentMoment = Date.now();
		
		if (clientRequests.length >= COUNT_LIMIT) {
			const timeBetweenLastFirstRequests = currentMoment - clientRequests[0].createTimeStamp;
			
			if (timeBetweenLastFirstRequests <= TIME_LIMIT) {
				await clientRequestsService.updateManyClientsRequestsByFilter({endpoint, ip}, {createTimeStamp: currentMoment});
				res.sendStatus(429);
				
				return;
			} else {
				await clientRequestsService.updateClientRequest(
					String(clientRequests[0]._id),
					{[ClientRequestSortByField.createTimeStamp]: Date.now()}
				);
			}
		} else {
			await clientRequestsService.createClientRequest(endpoint, ip);
		}
		
		next();
	} catch (error) {
		res.sendStatus(getErrorStatus(error));
	}
};
