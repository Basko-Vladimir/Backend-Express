import { bloggersRepository } from "./bloggers-repository";
import { postsRepository } from "./posts-repository";

export const testingRepository = {
	deleteAllData() {
		bloggersRepository.deleteAllBloggers();
		postsRepository.deleteAllPosts();
	}
};
