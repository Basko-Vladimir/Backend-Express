import "dotenv/config";
import mongoose from "mongoose";
import {
	blogsSchema,
	clientRequestsSchema,
	commentsSchema,
	devicesSessionsSchema,
	postsSchema,
	usersSchema
} from "./schemas";
import {DataBaseError} from "../classes/errors";
import {settings} from "../settings";

export const BlogsModel = mongoose.model("blogs", blogsSchema);
export const PostsModel = mongoose.model("posts", postsSchema);
export const UsersModel = mongoose.model("users", usersSchema);
export const CommentsModel = mongoose.model("comments", commentsSchema);
export const ClientRequestsModel = mongoose.model("requests", clientRequestsSchema);
export const DevicesSessionsModel = mongoose.model("devices_sessions", devicesSessionsSchema);

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
