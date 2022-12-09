import {User} from "../classes/users";
import {DeviceSession} from "../classes/devices-sessions";

declare global {
	declare namespace Express {
		export interface Request {
			context: {
				user: User | null,
				session?: DeviceSession
			};
		}
	}
}
