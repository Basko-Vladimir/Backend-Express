import { DeleteResult } from "mongodb";
import { IBlogger } from "../../interfaces/bloggers-interfaces";
import {bloggersCollection} from "../db";

export const bloggersRepository = {
	async getAllBloggers(): Promise<IBlogger[]> {
		return bloggersCollection.find({}).toArray();
	},
	async getBloggerById(id: string): Promise<IBlogger | null> {
		return bloggersCollection.findOne({id});
	},
	async deleteAllBloggers(): Promise<void> {
		await bloggersCollection.deleteMany({});
		return
	},
	async deleteBlogger(id: string): Promise<boolean> {
		const { deletedCount } = await bloggersCollection.deleteOne({id});
		return Boolean(deletedCount);
	},
	async createBlogger(name: string, youtubeUrl: string): Promise<IBlogger> {
		const newBlogger: IBlogger = {
			id: String(Date.now()),
			createdAt: new Date().toISOString(),
			youtubeUrl,
			name
		};
		
		await bloggersCollection.insertOne(newBlogger);
		return newBlogger;
	},
	async updateBlogger(id: string, name: string, youtubeUrl: string): Promise<boolean> {
		const { matchedCount } = await bloggersCollection.updateOne({id}, {$set: {name, youtubeUrl}});
		return Boolean(matchedCount);
	}
};
