import {User} from "../classes/users";

declare global {
	declare namespace Express {
		export interface Request {
			user: User | null;
		}
	}
}
