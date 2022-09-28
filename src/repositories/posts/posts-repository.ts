import { ObjectId } from "mongodb";
import {postsCollection} from "../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import { DbPost } from "../interfaces/posts-interfaces";
import {PostOutputModel} from "../../models/posts/output-models";
import {DataBaseError, NotFoundError} from "../../classes/errors";
import { EntityWithoutId } from "../../common/interfaces";

class PostsRepository {
	async getPostById(id: string): Promise<DbPost | null> {
		return postsCollection.findOne(getFilterByDbId(id));
	}
	
	async createPost(postData: EntityWithoutId<DbPost>): Promise<string> {
		const { insertedId } = await postsCollection.insertOne(postData);
		
		if (!insertedId) throw new DataBaseError();
		
		return String(insertedId);
	}
	
	async updatePost(postData: Omit<PostOutputModel, "createdAt" | "blogName">): Promise<void> {
		const { id, blogId, shortDescription, title, content } = postData;
		const { matchedCount } = await postsCollection.updateOne(
			getFilterByDbId(id),
			{$set: {shortDescription, title, content, blogId: new ObjectId(blogId)}}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deletePost(id: string): Promise<void> {
		const { deletedCount } = await postsCollection.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllPosts(): Promise<void> {
		await postsCollection.deleteMany({});
	}
}

export const postsRepository = new PostsRepository();
