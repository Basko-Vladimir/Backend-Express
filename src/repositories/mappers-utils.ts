import { ObjectId } from "mongodb";
import {BlogOutputModel} from "../models/blogs/output-models";
import { PostOutputModel } from "../models/posts/output-models";
import {DbBlog, DbPost} from "./interfaces";

export const getFilterByDbId = (id: string): {_id: ObjectId} => ({_id: new ObjectId(id)});

export const mapDbBlogToBlogOutputModel = (blog: DbBlog): BlogOutputModel => {
	return {
		id: String(blog._id),
		name: blog.name,
		youtubeUrl: blog.youtubeUrl,
		createdAt: String(blog.createdAt)
	}
};

export const mapDbPostToPostOutputModel = (post: DbPost): PostOutputModel => {
	return {
		id: String(post._id),
		title: post.title,
		shortDescription: post.shortDescription,
		content: post.content,
		blogId: String(post.blogId),
		blogName: post.blogName,
		createdAt: String(post.createdAt)
	}
};
