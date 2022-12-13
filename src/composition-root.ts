import "reflect-metadata"; // !important since inversify use reflect-metadata inside itself,
													 // import of reflect-metadata should be before import of inversify
import {Container} from "inversify";

import {BlogsRepository} from "./repositories/blogs/blogs-repository";
import {QueryBlogsRepository} from "./repositories/blogs/query-blogs-repository";
import {BlogsService} from "./services/blogs-service";
import {BlogsController} from "./controllers/blogs-controller";

import {PostsRepository} from "./repositories/posts/posts-repository";
import {QueryPostsRepository} from "./repositories/posts/query-posts-repository";
import {PostsService} from "./services/posts-service";
import {PostsController} from "./controllers/posts-controller";

import {QueryUsersRepository} from "./repositories/users/query-users-repository";
import {UsersRepository} from "./repositories/users/users-repository";
import {UsersController} from "./controllers/users-controller";
import {UsersService} from "./services/users-service";

import {CommentsRepository} from "./repositories/comments/comments-repository";
import {QueryCommentsRepository} from "./repositories/comments/query-comments-repository";
import {CommentsService} from "./services/comments-service";
import {CommentsController} from "./controllers/comments-controller";

import {ClientRequestsService} from "./services/client-requests-service";
import {ClientRequestsRepository} from "./repositories/client-requests/client-requests-repository";

import {DevicesSessionsRepository} from "./repositories/devices-sessions/devices-sessions-repository";
import {QueryDevicesSessionsRepository} from "./repositories/devices-sessions/query-devices-sessions-repository";
import {DevicesSessionsService} from "./services/devices-sessions-service";
import {DevicesSessionsController} from "./controllers/devices-sessions-controller";

import {TestingController} from "./controllers/testing-controller";
import {TestingService} from "./services/testing-service";

import {AuthService} from "./services/auth-service";
import {AuthController} from "./controllers/auth-controller";

import {JwtService} from "./services/jwt-service";
import {EmailAdapter} from "./adapters/email-adapter";
import {EmailManager} from "./managers/email-manager";

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

// CUD repositories
iocContainer.bind(BlogsRepository).to(BlogsRepository);
iocContainer.bind(PostsRepository).to(PostsRepository);
iocContainer.bind(UsersRepository).to(UsersRepository);
iocContainer.bind(CommentsRepository).to(CommentsRepository);
iocContainer.bind(ClientRequestsRepository).to(ClientRequestsRepository);
iocContainer.bind(DevicesSessionsRepository).to(DevicesSessionsRepository);

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

// controllers
iocContainer.bind(BlogsController).to(BlogsController);
iocContainer.bind(PostsController).to(PostsController);
iocContainer.bind(UsersController).to(UsersController);
iocContainer.bind(CommentsController).to(CommentsController);
iocContainer.bind(AuthController).to(AuthController);
iocContainer.bind(DevicesSessionsController).to(DevicesSessionsController);
iocContainer.bind(TestingController).to(TestingController);
