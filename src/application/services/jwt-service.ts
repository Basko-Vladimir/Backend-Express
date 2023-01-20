import jwt, { JwtPayload } from "jsonwebtoken";
import {injectable} from "inversify";
import {settings} from "../../settings";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		userId: string;
		deviceId?: string;
	}
}

@injectable()
export class JwtService {
	async createJWT(payload: JwtPayload, expiresIn: string): Promise<string> {
		return jwt.sign(payload, settings.JWT_SECRET, {expiresIn});
	}
	
	async getTokenPayload(token: string): Promise<JwtPayload | null> {
		try {
			const result: JwtPayload = <JwtPayload>jwt.verify(token, settings.JWT_SECRET);
			return result;
		} catch {
			return null;
		}
	}
}
