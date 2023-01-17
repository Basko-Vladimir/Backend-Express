import {HydratedDocument, Model, model} from "mongoose";
import {blogSchema} from "./BlogSchema";
import {IPost, IPostProps} from "../posts/PostTypes";

export interface IBlogProps {
	name: string;
	websiteUrl: string;
	description: string;
	createdAt: Date;
}

export interface IBlogMethods {
	updateBlogData(data: Omit<IBlogProps, "createdAt">): IBlog;
	createPost(data: Omit<IPostProps, "createdAt">): IPost
}

export interface IBlog extends HydratedDocument<IBlogProps, IBlogMethods> {}

export interface IBlogModel extends Model<IBlogProps, {}, IBlogMethods> {
	createBlogEntity(
		name: string,
		websiteUrl: string,
		description: string
	): Promise<IBlog>;
}

export const BlogModel = model<IBlogProps, IBlogModel>("Blog", blogSchema);
