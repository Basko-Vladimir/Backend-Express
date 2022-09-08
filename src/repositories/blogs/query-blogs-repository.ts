import {blogsCollection} from "../db";
import { DataBaseError } from "../../classes/errors";
import {SortSetting} from "../../interfaces/common-interfaces";
import {BlogOutputModel} from "../../models/blogs/output-models";
import {getFilterByDbId, mapDbBlogToBlogOutputModel} from "../../utils/mappers";

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
			throw new DataBaseError();
		}
	},
	
	async getBlogById(id: string): Promise<BlogOutputModel> {
		const blog = await blogsCollection.findOne(getFilterByDbId(id));
		
		if (!blog) throw new DataBaseError();
		
		return mapDbBlogToBlogOutputModel(blog);
	}
};
