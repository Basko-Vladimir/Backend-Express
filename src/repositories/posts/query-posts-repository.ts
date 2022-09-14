import {postsCollection} from "../db";
import {getFilterByDbId, mapDbPostToPostOutputModel} from "../mappers-utils";
import { DataBaseError } from "../../classes/errors";
import { SortSetting } from "../interfaces";
import {PostOutputModel} from "../../models/posts/output-models";

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
			throw new DataBaseError();
		}
	},
	
	async getPostById(id: string): Promise<PostOutputModel> {
		const blog = await postsCollection.findOne(getFilterByDbId(id));
		
		if (!blog) throw new DataBaseError();
		
		return mapDbPostToPostOutputModel(blog);
	}
};
