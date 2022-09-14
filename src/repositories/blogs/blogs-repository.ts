import {blogsCollection} from "../db";
import {DbBlog} from "../interfaces";
import {getFilterByDbId} from "../mappers-utils";
import {NotFoundError} from "../../classes/errors";
import {EntityWithoutId} from "../../interfaces/common-interfaces";
import {UpdateBlogInputModel} from "../../models/blogs/input-models";
import { Blog } from "../../classes/blogs";

export const blogsRepository = {
	async getBlogById(id: string): Promise<Blog | null> {
		return await blogsCollection.findOne(getFilterByDbId(id));
	},
	
	async createBlog(blogData: EntityWithoutId<DbBlog>): Promise<string> {
		const { insertedId } = await blogsCollection.insertOne(blogData);
		
		if (!insertedId) throw new NotFoundError();
		
		return String(insertedId);
	},
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		const { matchedCount } = await blogsCollection.updateOne(
			getFilterByDbId(id),
			{$set: {...data}}
		);
		
		if (!matchedCount) throw new NotFoundError();
	},
	
	async deleteBlog(id: string): Promise<void> {
		const { deletedCount } = await blogsCollection.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	},
	
	// async deleteAllBlogs(): Promise<void> {
	// 	await blogsCollection.deleteMany({});
	// }
};