import {DbDeviceSession} from "../infrastructure/repositories/interfaces/devices-sessions";

declare global {
	declare namespace Express {
		export interface Request {
			context: {
				user: IUser | null,
				session?: DbDeviceSession
			};
		}
	}
}
