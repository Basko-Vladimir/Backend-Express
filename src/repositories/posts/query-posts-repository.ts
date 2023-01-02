import { ObjectId } from "mongodb";
import {postsCollection} from "../db";
import {NotFoundError} from "../../classes/errors";
import {countSkipValue, setSortValue} from "../utils/common-utils";
import {getFilterByDbId, mapDbPostToPostOutputModel} from "../utils/mappers-utils";
import {PostOutputModel, PostsQueryParamsOutputModel} from "../../models/posts/output-models";
import {BlogAllPostsOutputModel} from "../../models/blogs/output-models";

export const queryPostsRepository = {
	async getAllPosts(queryParamsData: PostsQueryParamsOutputModel): Promise<BlogAllPostsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			
			const totalCount = await postsCollection.countDocuments();
			const blogs = await postsCollection
				.find({})
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting)
				.toArray();
			
			return {
				pagesCount: Math.ceil(totalCount / pageSize),
				page: pageNumber,
				pageSize: pageSize,
				totalCount: totalCount,
				items: blogs.map(mapDbPostToPostOutputModel)
			};
		} catch {
			throw new NotFoundError();
		}
	},
	
	async getAllPostsByBlogId(
		queryParamsData: PostsQueryParamsOutputModel,
		blogId: string
	): Promise<BlogAllPostsOutputModel> {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize } = queryParamsData;
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			const filterByBlogId = {blogId: new ObjectId(blogId)};
			
			const totalCount = await postsCollection.countDocuments(filterByBlogId);
			const posts = await postsCollection
				.find(filterByBlogId)
				.skip(skip)
				.limit(pageSize)
				.sort(sortSetting)
				.toArray();
			
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
	},
	
	async getPostById(id: string): Promise<PostOutputModel> {
		const post = await postsCollection.findOne(getFilterByDbId(id));
		
		if (!post) throw new NotFoundError();
		
		return mapDbPostToPostOutputModel(post);
	}
};
