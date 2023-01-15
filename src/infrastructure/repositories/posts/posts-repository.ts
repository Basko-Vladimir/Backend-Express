import { ObjectId } from "mongodb";
import {injectable} from "inversify";
import {PostsModel} from "../../db";
import {getFilterByDbId} from "../utils/mappers-utils";
import { DbPost } from "../interfaces/posts-interfaces";
import {Post} from "../../../domain/classes/posts";
import {UpdatePostInputModel} from "../../../application/models/posts/input-models";
import { DataBaseError, NotFoundError } from "../../../common/errors/errors-types";

@injectable()
export class PostsRepository {
	async getPostById(id: string): Promise<DbPost | null> {
		return PostsModel.findById(id);
	}
	
	async createPost(postData: Post): Promise<string> {
		const createdPost = await PostsModel.create(postData);
		
		if (!createdPost) throw new DataBaseError();
		
		return String(createdPost._id);
	}
	
	async updatePost(id: string, postData: UpdatePostInputModel): Promise<void> {
		const { blogId, shortDescription, title, content } = postData;
		const { matchedCount } = await PostsModel.updateOne(
			getFilterByDbId(id),
			{shortDescription, title, content, blogId: new ObjectId(blogId)}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deletePost(id: string): Promise<void> {
		const { deletedCount } = await PostsModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllPosts(): Promise<void> {
		await PostsModel.deleteMany({});
	}
}
