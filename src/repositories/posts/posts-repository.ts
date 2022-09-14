import { ObjectId } from "mongodb";
import {postsCollection} from "../db";
import {DbPost} from "../interfaces";
import {getFilterByDbId} from "../mappers-utils";
import {PostOutputModel} from "../../models/posts/output-models";
import {NotFoundError} from "../../classes/errors";
import { EntityWithoutId } from "../../interfaces/common-interfaces";

export const postsRepository = {
	async createPost(postData: EntityWithoutId<DbPost>): Promise<string> {
		const { insertedId } = await postsCollection.insertOne(postData);

		if (!insertedId) throw new NotFoundError();

		return String(insertedId);
 	},

	async updatePost(postData: Omit<PostOutputModel, "createdAt" | "blogName">): Promise<void> {
		const { id, blogId, shortDescription, title, content } = postData;
		const { matchedCount } = await postsCollection.updateOne(
			getFilterByDbId(id),
			{$set: {shortDescription, title, content, blogId: new ObjectId(blogId)}}
		);

		if (!matchedCount) throw new NotFoundError();
	},

	async deletePost(id: string): Promise<void> {
		const { deletedCount } = await postsCollection.deleteOne(getFilterByDbId(id));

		if (!deletedCount) throw new NotFoundError();
	},

	async deleteAllPosts(): Promise<void> {
		await postsCollection.deleteMany({});
	}
};
