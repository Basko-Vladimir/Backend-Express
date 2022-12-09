import { Schema } from "mongoose";
import {DbBlog} from "./interfaces/blogs-interfaces";

export const blogsSchema = new Schema<DbBlog>({
	name: String,
	websiteUrl: String,
	description: String,
	createdAt: Date
});
