import {inject, injectable} from "inversify";
import {BlogsService} from "./blogs-service";
import {PostsService} from "./posts-service";
import {UsersService} from "./users-service";
import {CommentsService} from "./comments-service";

@injectable()
export class TestingService {
	constructor(
		@inject(BlogsService) protected blogsService: BlogsService,
		@inject(PostsService) protected postsService: PostsService,
		@inject(UsersService) protected usersService: UsersService,
		@inject(CommentsService) protected commentsService: CommentsService
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
