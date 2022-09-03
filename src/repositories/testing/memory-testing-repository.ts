import { postsRepository } from "../posts/db-posts-repository";
import { bloggersRepository } from "../bloggers/db-bloggers-repository";
import { DeleteResult } from "mongodb";

export const testingRepository = {
	async deleteAllData(): Promise<DeleteResult[]> {
		return Promise.all([bloggersRepository.deleteAllBloggers(), postsRepository.deleteAllPosts()]);
	}
};
