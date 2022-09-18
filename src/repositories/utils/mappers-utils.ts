import { ObjectId } from "mongodb";
import {DbBlog} from "../interfaces/blogs-interfaces";
import {DbPost} from "../interfaces/posts-interfaces";
import {DbUser} from "../interfaces/users-interfaces";
import {BlogOutputModel} from "../../models/blogs/output-models";
import { PostOutputModel } from "../../models/posts/output-models";
import {UserOutputModel} from "../../models/users/output-models";

export const getFilterByDbId = (id: string): {_id: ObjectId} => ({_id: new ObjectId(id)});

export const mapDbBlogToBlogOutputModel = (blog: DbBlog): BlogOutputModel => {
	return {
		id: String(blog._id),
		name: blog.name,
		youtubeUrl: blog.youtubeUrl,
		createdAt: blog.createdAt.toISOString()
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
		createdAt: post.createdAt.toISOString()
	}
};

export const mapDbUserToUserOutputModel = (user: DbUser): UserOutputModel => {
	return {
		id: String(user._id),
		login: user.login,
		email: user.email,
		createdAt: user.createdAt.toISOString()
	}
}
