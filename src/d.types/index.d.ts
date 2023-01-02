import {DbUser} from "../repositories/interfaces/users-interfaces";

declare global {
	declare namespace Express {
		export interface Request {
			user: DbUser | null;
		}
	}
}
