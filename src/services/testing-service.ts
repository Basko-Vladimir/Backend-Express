import {BlogsService} from "./blogs-service";
import {PostsService} from "./posts-service";
import {UsersService} from "./users-service";
import {CommentsService} from "./comments-service";

export class TestingService {
	constructor(
		protected blogsService: BlogsService,
		protected postsService: PostsService,
		protected usersService: UsersService,
		protected commentsService: CommentsService
	) {}
	
	async deleteAllData(): Promise<void[]> {
		return Promise.all([
			this.blogsService.deleteAllBlogs(),
			this.postsService.deleteAllPosts(),
			this.usersService.deleteAllUsers(),
			this.commentsService.deleteAllComments()
		]);
	}
}
