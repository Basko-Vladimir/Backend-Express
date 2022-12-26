import {DbUser} from "../repositories/interfaces/users-interfaces";
import {DbDeviceSession} from "../repositories/interfaces/devices-sessions";

declare global {
	declare namespace Express {
		export interface Request {
			context: {
				user: DbUser | null,
				session?: DbDeviceSession
			};
		}
	}
}
