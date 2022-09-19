import jwt from "jsonwebtoken";
import {settings} from "../settings";

export const jwtService = {
	async createJWT(userId: string): Promise<string> {
		return jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: "100d"});
	},
	
	async getUserIdByToken(token: string): Promise<string | null> {
		try {
			const result: any = jwt.verify(token, settings.JWT_SECRET);
			console.log(result) //TODO need remove this console.log later
			return result.userId;
		} catch {
			return null;
		}
	}
};
