import {injectable} from "inversify";
import {blogsCollection} from "../db";
import {getFilterByDbId, mapDbBlogToBlogOutputModel} from "../utils/mappers-utils";
import {NotFoundError} from "../../classes/errors";
import {AllBlogsOutputModel, BlogOutputModel, BlogsQueryParamsOutputModel} from "../../models/blogs/output-models";
import {countSkipValue, setSortValue} from "../utils/common-utils";

@injectable()
export class QueryBlogsRepository {
	async getAllBlogs(queryParamsData: BlogsQueryParamsOutputModel): Promise<AllBlogsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize, searchNameTerm } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			
			const totalCount = await blogsCollection.countDocuments(
				{name: {$regex: searchNameTerm, $options: "i"}}
			);
			const blogs = await blogsCollection
				.find({name: {$regex: searchNameTerm, $options: "i"}})
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting)
				.toArray();
			
			return {
				pagesCount: Math.ceil(totalCount / pageSize),
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: blogs.map(mapDbBlogToBlogOutputModel)
			};
		} catch {
			throw new NotFoundError();
		}
	}
	
	async getBlogById(id: string): Promise<BlogOutputModel> {
		const blog = await blogsCollection.findOne(getFilterByDbId(id));
		
		if (!blog) throw new NotFoundError();
		
		return mapDbBlogToBlogOutputModel(blog);
	}
}
