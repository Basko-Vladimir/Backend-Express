import "reflect-metadata"; // !important since inversify use reflect-metadata inside itself,
													 // import of reflect-metadata should be before import of inversify
import {Container} from "inversify";

import {BlogsRepository} from "./infrastructure/repositories/blogs/blogs-repository";
import {QueryBlogsRepository} from "./infrastructure/repositories/blogs/query-blogs-repository";
import {BlogsService} from "./application/services/blogs-service";
import {BlogsController} from "./api/controllers/blogs-controller";

import {PostsRepository} from "./infrastructure/repositories/posts/posts-repository";
import {QueryPostsRepository} from "./infrastructure/repositories/posts/query-posts-repository";
import {PostsService} from "./application/services/posts-service";
import {PostsController} from "./api/controllers/posts-controller";

import {QueryUsersRepository} from "./infrastructure/repositories/users/query-users-repository";
import {UsersRepository} from "./infrastructure/repositories/users/users-repository";
import {UsersController} from "./api/controllers/users-controller";
import {UsersService} from "./application/services/users-service";

import {CommentsRepository} from "./infrastructure/repositories/comments/comments-repository";
import {QueryCommentsRepository} from "./infrastructure/repositories/comments/query-comments-repository";
import {CommentsService} from "./application/services/comments-service";
import {CommentsController} from "./api/controllers/comments-controller";

import {ClientRequestsService} from "./application/services/client-requests-service";
import {ClientRequestsRepository} from "./infrastructure/repositories/client-requests/client-requests-repository";

import {DevicesSessionsRepository} from "./infrastructure/repositories/devices-sessions/devices-sessions-repository";
import {QueryDevicesSessionsRepository} from "./infrastructure/repositories/devices-sessions/query-devices-sessions-repository";
import {DevicesSessionsService} from "./application/services/devices-sessions-service";
import {DevicesSessionsController} from "./api/controllers/devices-sessions-controller";

import {LikesRepository} from "./infrastructure/repositories/likes/likes-repository";
import {QueryLikesRepository} from "./infrastructure/repositories/likes/query-likes-repository";
import {LikesService} from "./application/services/likes-service";

import {TestingController} from "./api/controllers/testing-controller";
import {TestingService} from "./application/services/testing-service";

import {AuthService} from "./application/services/auth-service";
import {AuthController} from "./api/controllers/auth-controller";

import {JwtService} from "./application/services/jwt-service";
import {EmailAdapter} from "./infrastructure/adapters/email-adapter";
import {EmailManager} from "./application/managers/email-manager";

export const iocContainer = new Container();

// adapters
iocContainer.bind(EmailAdapter).to(EmailAdapter);

// managers
iocContainer.bind(EmailManager).to(EmailManager);

// query Repositories
iocContainer.bind(QueryBlogsRepository).to(QueryBlogsRepository);
iocContainer.bind(QueryPostsRepository).to(QueryPostsRepository);
iocContainer.bind(QueryUsersRepository).to(QueryUsersRepository);
iocContainer.bind(QueryCommentsRepository).to(QueryCommentsRepository);
iocContainer.bind(QueryDevicesSessionsRepository).to(QueryDevicesSessionsRepository);
iocContainer.bind(QueryLikesRepository).to(QueryLikesRepository);

// CUD repositories
iocContainer.bind(BlogsRepository).to(BlogsRepository);
iocContainer.bind(PostsRepository).to(PostsRepository);
iocContainer.bind(UsersRepository).to(UsersRepository);
iocContainer.bind(CommentsRepository).to(CommentsRepository);
iocContainer.bind(ClientRequestsRepository).to(ClientRequestsRepository);
iocContainer.bind(DevicesSessionsRepository).to(DevicesSessionsRepository);
iocContainer.bind(LikesRepository).to(LikesRepository);

// services
iocContainer.bind(BlogsService).to(BlogsService);
iocContainer.bind(PostsService).to(PostsService);
iocContainer.bind(UsersService).to(UsersService);
iocContainer.bind(CommentsService).to(CommentsService);
iocContainer.bind(AuthService).to(AuthService);
iocContainer.bind(ClientRequestsService).to(ClientRequestsService);
iocContainer.bind(DevicesSessionsService).to(DevicesSessionsService);
iocContainer.bind(TestingService).to(TestingService);
iocContainer.bind(JwtService).to(JwtService);
iocContainer.bind(LikesService).to(LikesService);

// controllers
iocContainer.bind(BlogsController).to(BlogsController);
iocContainer.bind(PostsController).to(PostsController);
iocContainer.bind(UsersController).to(UsersController);
iocContainer.bind(CommentsController).to(CommentsController);
iocContainer.bind(AuthController).to(AuthController);
iocContainer.bind(DevicesSessionsController).to(DevicesSessionsController);
iocContainer.bind(TestingController).to(TestingController);
