import {HydratedDocument, Model, model} from "mongoose";
import {blogSchema} from "./BlogSchema";
import {UpdateBlogInputModel} from "../../api/models/blogs/input-models";

export interface IBlogProps {
	name: string;
	websiteUrl: string;
	description: string;
	createdAt: Date;
}

export interface IBlogMethods {
	updateData(data: UpdateBlogInputModel): IBlog;
}

export interface IBlog extends HydratedDocument<IBlogProps, IBlogMethods> {}

export interface IBlogModel extends Model<IBlogProps, {}, IBlogMethods>{
	createEntity(
		name: string,
		websiteUrl: string,
		description: string
	): Promise<IBlog>;
}

export const BlogModel = model<IBlogProps, IBlogModel>("Blog", blogSchema);
