import { postsRepository } from "../posts/db-posts-repository";
import { bloggersRepository } from "../bloggers/db-bloggers-repository";

export const testingRepository = {
	async deleteAllData(): Promise<void> {
		await bloggersRepository.deleteAllBloggers();
		await postsRepository.deleteAllPosts();
	}
};
