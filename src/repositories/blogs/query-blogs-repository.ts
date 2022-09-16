import {blogsCollection} from "../db";
import {getFilterByDbId, mapDbBlogToBlogOutputModel} from "../utils/mappers-utils";
import { SortSetting } from "../interfaces/common-interfaces";
import {NotFoundError} from "../../classes/errors";
import {AllBlogsOutputModel, BlogOutputModel} from "../../models/blogs/output-models";

export const queryBlogsRepository = {
	async getAllBlogs(
		skip: number,
		limit: number,
		pageNumber: number,
		sortSetting: SortSetting,
		searchName: string
	): Promise<AllBlogsOutputModel> {
		try {
			const totalCount = await blogsCollection
				.countDocuments({name: {$regex: searchName || "", $options: "i"}});
			const blogs = await blogsCollection
				.find({name: {$regex: searchName || "", $options: "i"}})
				.skip(skip)
				.limit(limit)
				.sort(sortSetting)
				.toArray();
			
			return {
				pagesCount: Math.ceil(totalCount / limit),
				page: pageNumber,
				pageSize: limit,
				totalCount: totalCount,
				items: blogs.map(mapDbBlogToBlogOutputModel)
			};
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
