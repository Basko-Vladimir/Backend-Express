import {Request, Response, Router} from "express";
import {getErrorStatus, countSkipValue, parseQueryParamsValues, setSortValue} from "./utils";
import {postsService} from "../services/posts-service";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../interfaces/common-interfaces";
import {checkAuthorization} from "../middlewares/check-authorization";
import {checkPostRequestBody} from "../middlewares/posts/post-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {PostOutputModel} from "../models/posts/output-models";
import {ParamIdInputModel, QueryParamsInputModel} from "../models/common-models";
import {queryPostsRepository} from "../repositories/posts/query-posts-repository";
import {CreatePostInputModel, UpdatePostInputModel} from "../models/posts/input-models";
import {queryBlogsRepository} from "../repositories/blogs/query-blogs-repository";
export const postsRouter = Router({});

postsRouter.get(
	"/",
	async (req: TypedRequestQuery<QueryParamsInputModel>, res: Response<PostOutputModel[]>) => {
		try {
			const { sortBy, sortDirection, pageNumber , pageSize } = parseQueryParamsValues(req.query);
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			const posts = await queryPostsRepository.getAllPosts(skip, pageSize, sortSetting);

			res.status(200).send(posts);
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
	checkAuthorization,
	checkPostRequestBody,
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
	checkAuthorization,
	checkPostRequestBody,
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
	checkAuthorization,
	requestErrorsValidation,
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response) => {
		try {
			await postsService.deletePost(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});
