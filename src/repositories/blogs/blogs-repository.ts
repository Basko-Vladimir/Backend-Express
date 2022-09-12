import {blogsCollection} from "../db";
import {DataBaseError} from "../../classes/errors";
import {EntityWithoutId} from "../../interfaces/common-interfaces";
import {DbBlog} from "../interfaces";
import {UpdateBlogInputModel} from "../../models/blogs/input-models";
import {getFilterByDbId} from "../mappers-utils";

export const blogsRepository = {
	// async getBlogById(_id: ObjectId): Promise<Blog> {
	// 	const blog = await blogsCollection.findOne({_id});
	//
	// 	if (!blog) throw new DataBaseError();
	//
	// 	return blog;
	// },
	
	async createBlog(blogData: EntityWithoutId<DbBlog>): Promise<string> {
		const { insertedId } = await blogsCollection.insertOne(blogData);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	},
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		const { matchedCount } = await blogsCollection.updateOne(
			getFilterByDbId(id),
			{$set: {...data}}
		);
		
		if (!matchedCount) throw new DataBaseError();
	},
	
	async deleteBlog(id: string): Promise<void> {
		const { deletedCount } = await blogsCollection.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new DataBaseError();
	},
	
	async deleteAllBlogs(): Promise<void> {
		await blogsCollection.deleteMany({});
	}
};
