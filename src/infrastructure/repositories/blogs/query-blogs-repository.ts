import {injectable} from "inversify";
import {BlogsModel} from "../../db";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbBlogToBlogOutputModel} from "../utils/mappers-utils";
import {
	AllBlogsOutputModel,
	BlogOutputModel,
	BlogsQueryParamsOutputModel
} from "../../../application/models/blogs/output-models";
import { NotFoundError } from "../../../common/errors/errors-types";

@injectable()
export class QueryBlogsRepository {
	async getAllBlogs(queryParamsData: BlogsQueryParamsOutputModel): Promise<AllBlogsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize, searchNameTerm } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);

			const totalCount = await BlogsModel
				.countDocuments()
				.where("name", new RegExp(searchNameTerm, "i"));
			const blogs = await BlogsModel
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
		const blog = await BlogsModel.findById(id);
		
		if (!blog) throw new NotFoundError();
		
		return mapDbBlogToBlogOutputModel(blog);
	}
}
