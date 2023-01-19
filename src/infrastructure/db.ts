import "dotenv/config";
import mongoose from "mongoose";
import { DataBaseError } from "../common/errors/errors-types";
import {
	clientRequestsSchema,
	commentsSchema,
	devicesSessionsSchema,
	likesSchema
} from "../domain/schemas";
import {settings} from "../settings";

export const CommentsModel = mongoose.model("comments", commentsSchema);
export const ClientRequestsModel = mongoose.model("requests", clientRequestsSchema);
export const DevicesSessionsModel = mongoose.model("devices_sessions", devicesSessionsSchema);
export const LikesModel = mongoose.model("likes", likesSchema);

export async function runDb() {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(settings.MONGO_URI, {dbName: settings.DB});
		
		console.log(`Connected successfully to Mongo server (${settings.MONGO_URI})!!!`);
	} catch (err) {
		console.log(err);
		await mongoose.disconnect();
		throw new DataBaseError("Can't connect to mongodb!");
	}
}
