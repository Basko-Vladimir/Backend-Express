// import {EntityWithoutId, SortSetting} from "../interfaces/common-interfaces";
// import {Post} from "../classes/posts";
// import {postsCollection} from "./db";
// import {DataBaseError} from "../classes/errors";
// import { ObjectId } from "mongodb";
// import {UpdatePostModel} from "../models/post-models";
//
// export const postsRepository = {
// 	async getPosts(
// 		skip: number,
// 		limit: number,
// 		sortSetting: SortSetting,
// 		blogId: ObjectId | null
// 	): Promise<Post[]> {
// 		const findCondition = blogId ? {blogId} : {};
//
// 		return await postsCollection
// 			.find(findCondition)
// 			.skip(skip)
// 			.limit(limit)
// 			.sort(sortSetting)
// 			.toArray()
// 	},
//
// 	async getPostById(_id: ObjectId): Promise<Post> {
// 		const post = await postsCollection.findOne({_id});
//
// 		if (!post) throw new DataBaseError();
//
// 		return post;
// 	},
//
// 	async createPost(postData: EntityWithoutId<Post>): Promise<Post> {
// 		const { insertedId: _id } = await postsCollection.insertOne(postData);
// 		const createdPost = await postsCollection.findOne({_id});
//
// 		if (!createdPost) throw new DataBaseError();
//
// 		return createdPost;
//  	},
//
// 	async updatePost(_id: ObjectId, postData: UpdatePostModel): Promise<void> {
// 		const { blogId } = postData;
// 		const { matchedCount } = await postsCollection.updateOne(
// 			{_id},
// 			{$set: {...postData, blogId: new ObjectId(blogId)}}
// 		);
//
// 		if (!matchedCount) throw new DataBaseError();
// 	},
//
// 	async deletePost(_id: ObjectId): Promise<void> {
// 		const { deletedCount } = await postsCollection.deleteOne({_id});
//
// 		if (!deletedCount) throw new DataBaseError();
// 	},
//
// 	async deleteAllPosts(): Promise<void> {
// 		await postsCollection.deleteMany({});
// 	}
// };
