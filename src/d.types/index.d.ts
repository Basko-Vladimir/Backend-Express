import {DeviceSession} from "../classes/devices-sessions";
import {DbUser} from "../repositories/interfaces/users-interfaces";

declare global {
	declare namespace Express {
		export interface Request {
			context: {
				user: DbUser | null,
				session?: DeviceSession
			};
		}
	}
}
