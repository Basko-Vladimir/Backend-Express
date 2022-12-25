import "dotenv/config";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import {EntityWithoutId} from "../common/interfaces";
import {DataBaseError} from "../classes/errors";
import {ClientRequest} from "../classes/client-requests";
import {DeviceSession} from "../classes/devices-sessions";
import {settings} from "../settings";
import {blogsSchema, commentsSchema, postsSchema, usersSchema} from "./schemas";

const client = new MongoClient(settings.MONGO_URI);
const db = client.db(settings.DB);

export const BlogsModel = mongoose.model("blogs", blogsSchema);
export const PostsModel = mongoose.model("posts", postsSchema);
export const UsersModel = mongoose.model("users", usersSchema);
export const commentsModel = mongoose.model("comments", commentsSchema);
export const clientRequestsCollection = db.collection<EntityWithoutId<ClientRequest>>("requests");
export const devicesSessionsCollection = db.collection<EntityWithoutId<DeviceSession>>("devices_sessions");

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
