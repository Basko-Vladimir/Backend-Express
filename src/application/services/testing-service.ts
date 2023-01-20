import {inject, injectable} from "inversify";
import {BlogsService} from "./blogs-service";
import {PostsService} from "./posts-service";
import {UsersService} from "./users-service";
import {CommentsService} from "./comments-service";
import {ClientRequestsService} from "./client-requests-service";
import {DevicesSessionsService} from "./devices-sessions-service";
import { LikesService } from "./likes-service";

@injectable()
export class TestingService {
	constructor(
		@inject(BlogsService) protected blogsService: BlogsService,
		@inject(PostsService) protected postsService: PostsService,
		@inject(UsersService) protected usersService: UsersService,
		@inject(CommentsService) protected commentsService: CommentsService,
		@inject(ClientRequestsService) protected clientRequestsService: ClientRequestsService,
		@inject(DevicesSessionsService) protected devicesSessionsService: DevicesSessionsService,
		@inject(LikesService) protected likesService: LikesService,
	) {}
	
	async deleteAllData(): Promise<void[]> {
		return Promise.all([
			this.blogsService.deleteAllBlogs(),
			this.postsService.deleteAllPosts(),
			this.usersService.deleteAllUsers(),
			this.commentsService.deleteAllComments(),
			this.clientRequestsService.deleteAllClientRequests(),
			this.devicesSessionsService.deleteAllDevicesSessions(),
			this.likesService.deleteAllLikes()
		]);
	}
}
