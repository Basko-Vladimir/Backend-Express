import { ObjectId } from "mongodb";
import {injectable} from "inversify";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {mapDbPostToPostOutputModel} from "../utils/mappers-utils";
import {PostOutputModel, PostsQueryParamsOutputModel} from "../../../api/models/posts/output-models";
import {BlogAllPostsOutputModel} from "../../../api/models/blogs/output-models";
import { NotFoundError } from "../../../common/errors/errors-types";
import { PostModel } from "../../../domain/posts/PostTypes";

@injectable()
export class QueryPostsRepository {
	async getAllPosts(queryParamsData: PostsQueryParamsOutputModel): Promise<BlogAllPostsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			
			const totalCount = await PostModel.countDocuments();
			const posts = await PostModel
				.find({})
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting);
			
			return {
				pagesCount: Math.ceil(totalCount / pageSize),
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: posts.map(mapDbPostToPostOutputModel)
			};
		} catch {
			throw new NotFoundError();
		}
	}
	
	async getAllPostsByBlogId(
		queryParamsData: PostsQueryParamsOutputModel,
		blogId: string
	): Promise<BlogAllPostsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			
			const totalCount = await PostModel
				.countDocuments()
				.where("blogId", new ObjectId(blogId));
			const posts = await PostModel
				.find({})
				.where("blogId", new ObjectId(blogId))
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting);
			
			return {
				pagesCount: Math.ceil(totalCount / pageSize),
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: posts.map(mapDbPostToPostOutputModel)
			};
		} catch {
			throw new NotFoundError();
		}
	}
	
	async getPostById(id: string): Promise<PostOutputModel> {
		const post = await PostModel.findById(id);
		
		if (!post) throw new NotFoundError();
		
		return mapDbPostToPostOutputModel(post);
	}
}
