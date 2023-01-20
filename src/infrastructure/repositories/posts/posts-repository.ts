import { ObjectId } from "mongodb";
import {injectable} from "inversify";
import {getFilterByDbId} from "../utils/mappers-utils";
import {UpdatePostInputModel} from "../../../api/models/posts/input-models";
import { NotFoundError } from "../../../common/errors/errors-types";
import {IPost, PostModel} from "../../../domain/posts/PostTypes";

@injectable()
export class PostsRepository {
	async getPostById(id: string): Promise<IPost | null> {
		return PostModel.findById(id);
	}
	
	async save(post: IPost): Promise<IPost> {
		return post.save();
	}
	
	async updatePost(id: string, postData: UpdatePostInputModel): Promise<void> {
		const { blogId, shortDescription, title, content } = postData;
		const { matchedCount } = await PostModel.updateOne(
			getFilterByDbId(id),
			{shortDescription, title, content, blogId: new ObjectId(blogId)}
		);
		
		if (!matchedCount) throw new NotFoundError();
	}
	
	async deletePost(id: string): Promise<void> {
		const { deletedCount } = await PostModel.deleteOne(getFilterByDbId(id));
		
		if (!deletedCount) throw new NotFoundError();
	}
	
	async deleteAllPosts(): Promise<void> {
		await PostModel.deleteMany({});
	}
}
