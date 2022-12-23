import "dotenv/config";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import {EntityWithoutId} from "../common/interfaces";
import {DataBaseError} from "../classes/errors";
import { User } from "../classes/users";
import {Comment} from "../classes/comments";
import {ClientRequest} from "../classes/client-requests";
import {DeviceSession} from "../classes/devices-sessions";
import {settings} from "../settings";
import {blogsSchema, postsSchema} from "./schemas";

const client = new MongoClient(settings.MONGO_URI);
const db = client.db(settings.DB);

export const BlogsModel = mongoose.model("blogs", blogsSchema);
export const PostsModel = mongoose.model("posts", postsSchema);
export const usersCollection = db.collection<EntityWithoutId<User>>("users");
export const commentsCollection = db.collection<EntityWithoutId<Comment>>("comments");
export const clientRequestsCollection = db.collection<EntityWithoutId<ClientRequest>>("requests");
export const devicesSessionsCollection = db.collection<EntityWithoutId<DeviceSession>>("devices_sessions");

export async function runDb() {
	try {
		await mongoose.connect(settings.MONGO_URI, {dbName: settings.DB});
		
		console.log(`Connected successfully to Mongo server (${settings.MONGO_URI})!!!`);
	} catch (err) {
		console.log(err);
		await mongoose.disconnect();
		throw new DataBaseError("Can't connect to mongodb!");
	}
}
