import { ObjectId } from "mongodb";
import {postsCollection} from "../db";
import {getFilterByDbId, mapDbPostToPostOutputModel} from "../mappers-utils";
import { SortSetting } from "../interfaces";
import {NotFoundError} from "../../classes/errors";
import {PostOutputModel} from "../../models/posts/output-models";
import {BlogAllPostsOutputModel} from "../../models/blogs/output-models";

export const queryPostsRepository = {
	async getAllPosts(
		skip: number,
		limit: number,
		sortSetting: SortSetting,
	): Promise<PostOutputModel[]> {
		try {
			const blogs = await postsCollection
				.find({})
				.skip(skip)
				.limit(limit)
				.sort(sortSetting)
				.toArray();
			
			return blogs.map(mapDbPostToPostOutputModel);
		} catch {
			throw new NotFoundError();
		}
	},
	
	async getAllPostsByBlogId(
		skip: number,
		limit: number,
		pageNumber: number,
		sortSetting: SortSetting,
		blogId: string
	): Promise<BlogAllPostsOutputModel> {
		try {
			const totalCount = await postsCollection
				.countDocuments({blogId: new ObjectId(blogId)});
			
			const posts = await postsCollection
				.find({blogId: new ObjectId(blogId)})
				.skip(skip)
				.limit(limit)
				.sort(sortSetting)
				.toArray();
			
			return {
				pagesCount: Math.ceil(totalCount / limit),
				page: pageNumber,
				pageSize: limit,
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
