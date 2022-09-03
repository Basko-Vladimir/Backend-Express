import { MongoClient } from "mongodb";
import {IBlogger} from "../interfaces/bloggers-interfaces";
import {IPost} from "../interfaces/posts-interfaces";

const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0";

const client = new MongoClient(mongoUri);
const db = client.db("homework3");

export const bloggersCollection = db.collection<IBlogger>("bloggers");
export const postsCollection = db.collection<IPost>("posts");

export async function runDb() {
	try {
		//Connect the client to the server
		await client.connect();
		// Establish and verify connection
		await db.command({ping: 1})
		console.log("Connected successfully to mongo server!!!");
	} catch (err) {
		console.log("Can't connect to mongodb! :(", err);
		await client.close();
	}
}
