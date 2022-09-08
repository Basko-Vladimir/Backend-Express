import { ObjectId } from "mongodb";
import {BlogOutputModel} from "../models/blogs/output-models";
import {DbBlog} from "../repositories/blogs/interfaces";

export function mapDbBlogToBlogOutputModel(blog: DbBlog): BlogOutputModel {
	return {
		id: String(blog._id),
		name: blog.name,
		youtubeUrl: blog.youtubeUrl,
		createdAt: String(blog.createdAt)
	}
}

export const getFilterByDbId = (id: string): {_id: ObjectId} => ({_id: new ObjectId(id)});
