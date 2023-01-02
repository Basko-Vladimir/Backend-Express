import {Request, Response, Router} from "express";
import {getErrorStatus} from "./utils";
import {postsService} from "../services/posts-service";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {postRequestFullBodyValidation} from "../middlewares/posts/post-request-full-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {PostAllCommentsOutputModel, PostOutputModel, PostsQueryParamsOutputModel} from "../models/posts/output-models";
import {ParamIdInputModel} from "../models/common-models";
import {queryPostsRepository} from "../repositories/posts/query-posts-repository";
import {
	CreatePostInputModel,
	ParamPostIdInputModel,
	PostsQueryParamsInputModel,
	UpdatePostInputModel
} from "../models/posts/input-models";
import {CommentSortByField, PostSortByField, SortDirection} from "../models/enums";
import {BlogAllPostsOutputModel} from "../models/blogs/output-models";
import {CommentQueryParamsInputModel, CreateCommentInputModel} from "../models/comments/input-models";
import {CommentOutputModel, CommentQueryParamsOutputModel} from "../models/comments/output-models";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from "../common/constants";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {postIdParamValidation} from "../middlewares/posts/post-id-param-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {commentRequestBodyValidation} from "../middlewares/comments/comment-request-body-validation";
import {queryCommentsRepository} from "../repositories/comments/query-comments-repository";
import {queryBlogsRepository} from "../repositories/blogs/query-blogs-repository";

export const postsRouter = Router({});

postsRouter.get(
	"/",
	async (req: TypedRequestQuery<PostsQueryParamsInputModel>, res: Response<BlogAllPostsOutputModel>) => {
		try {
			const { sortBy, sortDirection, pageNumber , pageSize } = req.query;
			const queryParamsData: PostsQueryParamsOutputModel = {
				sortBy: sortBy || PostSortByField.createdAt,
				sortDirection: sortDirection ? SortDirection[sortDirection] : SortDirection.desc,
				pageNumber: Number(pageNumber) || DEFAULT_PAGE_NUMBER,
				pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
			};
			const postsOutputModel = await queryPostsRepository.getAllPosts(queryParamsData);

			res.status(200).send(postsOutputModel);
		}	catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

postsRouter.get(
	"/:id",
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response<PostOutputModel>) => {
		try {
			const post = await queryPostsRepository.getPostById(req.params.id);
			res.status(200).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

postsRouter.post(
	"/",
	basicAuthValidation,
	postRequestFullBodyValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<CreatePostInputModel>, res: Response<PostOutputModel>) => {
		try {
			const { name: blogName } = await queryBlogsRepository.getBlogById(req.body.blogId);
			const createdPostId = await postsService.createPost({...req.body, blogName});
			const post = await queryPostsRepository.getPostById(createdPostId);
			res.status(201).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

postsRouter.put(
	"/:id",
	basicAuthValidation,
	postRequestFullBodyValidation,
	requestErrorsValidation,
	async (req: Request<ParamIdInputModel, {}, UpdatePostInputModel>, res: Response<void>) => {
		try {
			await postsService.updatePost({...req.body, ...req.params});
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

postsRouter.delete(
	"/:id",
	basicAuthValidation,
	requestErrorsValidation,
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response) => {
		try {
			await postsService.deletePost(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

postsRouter.post(
	"/:postId/comments",
	bearerAuthValidation,
	postIdParamValidation,
	commentRequestBodyValidation,
	requestErrorsValidation,
	async (req: Request<ParamPostIdInputModel, {}, CreateCommentInputModel>, res: Response<CommentOutputModel>) => {
		try {
			const commentData: Omit<CommentOutputModel, "id" | "createdAt"> = {
				content: req.body.content,
				userId: String(req.user!._id),
				userLogin: req.user!.login
			};
			const commentId = await postsService.createCommentByPostId(req.params.postId, commentData);
			const comment = await queryCommentsRepository.getCommentById(commentId);
			res.status(201).send(comment);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

postsRouter.get(
	"/:postId/comments",
	postIdParamValidation,
	async (
		req: Request<ParamPostIdInputModel, {}, {}, CommentQueryParamsInputModel>,
		res: Response<PostAllCommentsOutputModel>
	) => {
		try {
			const { sortBy, sortDirection, pageSize, pageNumber } = req.query;
			const queryParams: CommentQueryParamsOutputModel = {
				sortBy: sortBy || CommentSortByField.createdAt,
				sortDirection: sortDirection ? SortDirection[sortDirection] : SortDirection.desc,
				pageNumber: Number(pageNumber) || DEFAULT_PAGE_NUMBER,
				pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
			};
			const allCommentsByPostId = await queryCommentsRepository
				.getAllCommentsByPostId(queryParams, req.params.postId);
			
			res.status(200).send(allCommentsByPostId);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});
