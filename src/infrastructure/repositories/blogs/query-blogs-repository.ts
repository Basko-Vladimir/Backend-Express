import {injectable} from "inversify";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbBlogToBlogOutputModel} from "../utils/mappers-utils";
import {
	AllBlogsOutputModel,
	BlogOutputModel
} from "../../../api/models/blogs/output-models";
import { NotFoundError } from "../../../common/errors/errors-types";
import {BlogsQueryParamsInputModel} from "../../../api/models/blogs/input-models";
import { BlogModel } from "../../../domain/blogs/BlogTypes";

@injectable()
export class QueryBlogsRepository {
	async getAllBlogs(queryParamsData: BlogsQueryParamsInputModel): Promise<AllBlogsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize, searchNameTerm } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);

			const totalCount = await BlogModel
				.countDocuments()
				.where("name", new RegExp(searchNameTerm, "i"));
			const blogs = await BlogModel
				.find({})
				.where("name", new RegExp(searchNameTerm, "i"))
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting);
			
			return {
				pagesCount: Math.ceil(totalCount / pageSize),
				page: pageNumber,
				pageSize: pageSize,
				totalCount,
				items: blogs.map(mapDbBlogToBlogOutputModel)
			};
		} catch {
			throw new NotFoundError();
		}
	}
	
	async getBlogById(id: string): Promise<BlogOutputModel> {
		const blog = await BlogModel.findById(id);
		
		if (!blog) throw new NotFoundError();
		
		return mapDbBlogToBlogOutputModel(blog);
	}
}
