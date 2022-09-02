import { memoryPostsRepository } from "../posts/memory-posts-repository";
import { memoryBloggersRepository } from "../bloggers/memory-bloggers-repository";

export const memoryTestingRepository = {
	deleteAllData() {
		memoryBloggersRepository.deleteAllBloggers();
		memoryPostsRepository.deleteAllPosts();
	}
};
