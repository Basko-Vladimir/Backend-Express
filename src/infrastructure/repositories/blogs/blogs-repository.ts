import {injectable} from "inversify";
import {getFilterByDbId} from "../utils/mappers-utils";
import {UpdateBlogInputModel} from "../../../api/models/blogs/input-models";
import { DataBaseError, NotFoundError } from "../../../common/errors/errors-types";
import {BlogModel, IBlog} from "../../../domain/blogs/BlogTypes";

@injectable()
export class BlogsRepository {
	async getBlogById(id: string): Promise<IBlog | null> {
		return BlogModel.findById(id);
	}
	
	async save(entity: IBlog): Promise<IBlog> {
		try {
			return await entity.save();
		} catch (e) {
			throw new DataBaseError(String(e));
		}
	}
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		const { matchedCount } = await BlogModel.updateOne(
			getFilterByDbId(id),
			{...data}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deleteBlog(id: string): Promise<void> {
		const { deletedCount } = await BlogModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllBlogs(): Promise<void> {
		await BlogModel.deleteMany({});
	}
}
