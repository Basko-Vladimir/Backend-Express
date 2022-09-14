import {Request, Response, Router} from "express";
import {blogsService} from "../services/blogs-service";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../interfaces/common-interfaces";
import {checkAuthorization} from "../middlewares/check-authorization";
import {blogRequestBodyValidation} from "../middlewares/blogs/blog-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {getErrorStatus, countSkipValue, parseQueryParamsValues, setSortValue} from "./utils";
import {ParamIdInputModel, QueryParamsInputModel} from "../models/common-models";
import {BlogOutputModel} from "../models/blogs/output-models";
import {CreateBlogInputModel, UpdateBlogInputModel} from "../models/blogs/input-models";
import {queryBlogsRepository} from "../repositories/blogs/query-blogs-repository";

export const blogsRouter = Router({});

blogsRouter.get(
	"/",
	async (req: TypedRequestQuery<QueryParamsInputModel>, res: Response<BlogOutputModel[]>) => {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize, searchNameTerm } = parseQueryParamsValues(req.query);
			const skip = countSkipValue(pageNumber, pageSize);
			const sortSetting = setSortValue(sortBy, sortDirection);
			const searchNameTermValue = searchNameTerm || "";
			const blogs = await queryBlogsRepository.getAllBlogs(skip, pageSize, sortSetting, searchNameTermValue);
			
			res.status(200).send(blogs)
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.get(
	"/:id",
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response<BlogOutputModel>) => {
		try {
			const blog = await queryBlogsRepository.getBlogById(req.params.id);
			res.status(200).send(blog);
		}
		catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.post(
	"/",
	checkAuthorization,
	blogRequestBodyValidation,
	requestErrorsValidation,
	async (req: TypedRequestBody<CreateBlogInputModel>, res: Response<BlogOutputModel>) => {
		try {
			const createdBlogId = await blogsService.createBlog(req.body);
			const createdBlog = await queryBlogsRepository.getBlogById(createdBlogId);
			res.status(201).send(createdBlog);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.put(
	"/:id",
	checkAuthorization,
	blogRequestBodyValidation,
	requestErrorsValidation,
	async (req: Request<ParamIdInputModel, {}, UpdateBlogInputModel>, res: Response) => {
		try {
			await blogsService.updateBlog(req.params.id, req.body);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.delete(
	"/:id",
	checkAuthorization,
	requestErrorsValidation,
	async(req: TypedRequestParams<ParamIdInputModel>, res: Response) => {
		try {
			await blogsService.deleteBlog(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

// blogsRouter.post(
// 	"/:blogId/posts",
// 	checkAuthorization,
// 	checkPostRequestBody,
// 	requestErrorsValidation,
// 	async (req: Request<ParamBlogIdInputModel, {}, CreatePostModel>, res: Response<PostViewModel>) => {
// 		try {
// 			const post = await blogsService.createPostByBlogId(req.params.blogId, req.body);
// 			res.status(201).send(post);
// 		} catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});
//
// blogsRouter.get(
// 	"/:blogId/posts",
// 	async (req: Request<ParamBlogIdInputModel, {}, {}, InputPostsQueryParamsModel>, res: Response<PostViewModel[]>) => {
// 		try {
// 			const queries = setQueryParamsValues<OutputPostQueriesParams>(req.query);
// 			const blogId = req.params.blogId;
// 			const posts = await blogsService.getAllPostsByBlogId(queries, blogId);
// 			res.status(200).send(posts);
// 		} catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});