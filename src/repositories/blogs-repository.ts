import {ObjectId} from "mongodb";
import {blogsCollection} from "./db";
import { Blog } from "../classes/blogs";
import {DataBaseError} from "../classes/errors";
import {EntityWithoutId} from "../interfaces/common";
import {CreateBlogModel} from "../models/blog-models";

export const blogsRepository = {
	async getAllBlogs(): Promise<Blog[]> {
		return blogsCollection.find({}).toArray();
	},
	
	async getBlogById(_id: ObjectId): Promise<Blog> {
		const blog = await blogsCollection.findOne({_id});
		
		if (!blog) throw new DataBaseError();
		
		return blog;
	},
	
	async createBlog(blogData: EntityWithoutId<Blog>): Promise<Blog> {
		const { insertedId: _id } = await blogsCollection.insertOne(blogData);
		const createdBlog = await blogsCollection.findOne({_id});
		
		if (!createdBlog) throw new DataBaseError();
		
		return createdBlog;
	},
	
	async updateBlog(id: string, data: CreateBlogModel): Promise<void> {
		const { matchedCount } = await blogsCollection.updateOne(
			{_id: new ObjectId(id)},
			{$set: {...data}}
		);
		
		if (!matchedCount) throw new DataBaseError();
	},
	
	async deleteBlog(_id: ObjectId): Promise<void> {
		const { deletedCount } = await blogsCollection.deleteOne({_id});
		
		if (!deletedCount) throw new DataBaseError();
	}
};
