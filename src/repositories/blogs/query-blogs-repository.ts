import {blogsCollection} from "../db";
import {SortSetting} from "../interfaces";
import {getFilterByDbId, mapDbBlogToBlogOutputModel} from "../mappers-utils";
import {NotFoundError} from "../../classes/errors";
import {BlogOutputModel} from "../../models/blogs/output-models";

export const queryBlogsRepository = {
	async getAllBlogs(
		skip: number,
		limit: number,
		sortSetting: SortSetting,
		searchName: string
	): Promise<BlogOutputModel[]> {
		try {
			const blogs = await blogsCollection
				.find({name: {$regex: searchName || "", $options: "i"}})
				.skip(skip)
				.limit(limit)
				.sort(sortSetting)
				.toArray();
			
			return blogs.map(mapDbBlogToBlogOutputModel);
		} catch {
			throw new NotFoundError();
		}
	},
	
	async getBlogById(id: string): Promise<BlogOutputModel> {
		const blog = await blogsCollection.findOne(getFilterByDbId(id));
		
		if (!blog) throw new NotFoundError();
		
		return mapDbBlogToBlogOutputModel(blog);
	}
};
