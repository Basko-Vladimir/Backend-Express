import jwt, { JwtPayload } from "jsonwebtoken";
import {injectable} from "inversify";
import {settings} from "../settings";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		userId: string;
	}
}

@injectable()
export class JwtService {
	async createJWT(userId: string, expiresIn: string): Promise<string> {
		return jwt.sign({userId}, settings.JWT_SECRET, {expiresIn});
	}
	
	async getUserIdByToken(token: string): Promise<string | null> {
		try {
			const result: JwtPayload = <JwtPayload>jwt.verify(token, settings.JWT_SECRET);
			return result.userId;
		} catch {
			return null;
		}
	}
}
