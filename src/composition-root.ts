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
import {TestingController} from "./controllers/testing-controller";
import {TestingService} from "./services/testing-service";
import {AuthService} from "./services/auth-service";
import {JwtService} from "./services/jwt-service";
import {AuthController} from "./controllers/auth-controller";
import {EmailAdapter} from "./adapters/email-adapter";
import {EmailManager} from "./managers/email-manager";

//adapters
export const emailAdapter = new EmailAdapter();

//managers
export const emailManager = new EmailManager(emailAdapter);

//query Repositories
const queryBlogsRepository = new QueryBlogsRepository();
const queryPostsRepository = new QueryPostsRepository();
const queryUsersRepository = new QueryUsersRepository();
const queryCommentsRepository = new QueryCommentsRepository();

//CUD repositories
const blogsRepository = new BlogsRepository();
const postsRepository = new PostsRepository();
const usersRepository = new UsersRepository();
const commentsRepository = new CommentsRepository();

//services
export const commentsService = new CommentsService(commentsRepository);
export const usersService = new UsersService(usersRepository);
export const postsService = new PostsService(postsRepository, commentsService);
export const blogsService = new BlogsService(blogsRepository, postsService);
export const jwtService = new JwtService();
export const authService = new AuthService(usersService, emailManager);
export const testingService = new TestingService(blogsService, postsService, usersService, commentsService);

//controllers
export const postsController = new PostsController(
	postsService, queryPostsRepository, queryBlogsRepository, queryCommentsRepository
);
export const blogsController = new BlogsController(blogsService, queryBlogsRepository, queryPostsRepository);
export const usersController = new UsersController(usersService, queryUsersRepository);
export const commentsController = new CommentsController(commentsService, queryCommentsRepository);
export const testingController = new TestingController(testingService);
export const authController = new AuthController(authService, jwtService);
