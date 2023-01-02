import {blogsService} from "./blogs-service";
import {postsService} from "./posts-service";
import {usersService} from "./users-service";

export const testingService = {
	async deleteAllData(): Promise<void[]> {
		return Promise.all([
			blogsService.deleteAllBlogs(),
			postsService.deleteAllPosts(),
			usersService.deleteAllUsers()
		]);
	}
};
