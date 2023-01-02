import {injectable} from "inversify";
import {BlogsModel} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DataBaseError, NotFoundError} from "../../classes/errors";
import {UpdateBlogInputModel} from "../../models/blogs/input-models";
import { Blog } from "../../classes/blogs";

@injectable()
export class BlogsRepository {
	async getBlogById(id: string): Promise<Blog | null> {
		return BlogsModel.findById(id);
	}
	
	async createBlog(blogData: Blog): Promise<string> {
		const createdBLog = await BlogsModel.create(blogData);
		
		if (!createdBLog) throw new DataBaseError();
		
		return String(createdBLog._id);
	}
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		const { matchedCount } = await BlogsModel.updateOne(
			getFilterByDbId(id),
			{...data}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deleteBlog(id: string): Promise<void> {
		const { deletedCount } = await BlogsModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllBlogs(): Promise<void> {
		await BlogsModel.deleteMany({});
	}
}
