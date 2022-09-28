import {blogsService} from "./blogs-service";
import {postsService} from "./posts-service";
import {usersService} from "./users-service";
import {commentsService} from "./comments-service";

class TestingService {
	async deleteAllData(): Promise<void[]> {
		return Promise.all([
			blogsService.deleteAllBlogs(),
			postsService.deleteAllPosts(),
			usersService.deleteAllUsers(),
			commentsService.deleteAllComments()
		]);
	}
}

export const testingService = new TestingService();
