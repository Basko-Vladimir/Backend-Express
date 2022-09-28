import jwt, { JwtPayload } from "jsonwebtoken";
import {settings} from "../settings";

declare module "jsonwebtoken" {
	export interface JwtPayload {
		userId: string;
	}
}

class JwtService {
	async createJWT(userId: string): Promise<string> {
		return jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: "100d"});
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

export const jwtService = new JwtService();
