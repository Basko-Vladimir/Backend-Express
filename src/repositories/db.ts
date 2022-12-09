import "dotenv/config";
import {MongoClient} from "mongodb";
import {EntityWithoutId} from "../common/interfaces";
import {DataBaseError} from "../classes/errors";
import {Blog} from "../classes/blogs";
import {Post} from "../classes/posts";
import { User } from "../classes/users";
import {Comment} from "../classes/comments";
import {settings} from "../settings";

const client = new MongoClient(settings.MONGO_URI);
const db = client.db(settings.DB);

export const blogsCollection = db.collection<EntityWithoutId<Blog>>("blogs");
export const postsCollection = db.collection<EntityWithoutId<Post>>("posts");
export const usersCollection = db.collection<EntityWithoutId<User>>("users");
export const commentsCollection = db.collection<EntityWithoutId<Comment>>("comments");

export async function runDb() {
	try {
		await client.connect();
		await db.command({ping: 1});
		console.log(`Connected successfully to Mongo server (${settings.MONGO_URI})!!!`);
	} catch (err) {
		console.log(err);
		await client.close();
		throw new DataBaseError("Can't connect to mongodb!");
	}
}
