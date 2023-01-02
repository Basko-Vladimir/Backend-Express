import {blogsService} from "./blogs-service";
import {postsService} from "./posts-service";

export const testingService = {
	async deleteAllData(): Promise<void[]> {
		return Promise.all([
			blogsService.deleteAllBlogs(),
			postsService.deleteAllPosts()
		]);
	}
};
