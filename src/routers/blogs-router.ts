import {Router, Request, Response} from "express";
import {BlogsQueryParamsModel, BlogViewModel, CreateBlogModel, UpdateBlogModel} from "../models/blog-models";
import {blogsService} from "../services/blogs-service";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../interfaces/blogs";
import {checkAuthorization} from "../middlewares/check-authorization";
import {blogRequestBodyValidation} from "../middlewares/blogs/blog-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {IdParamModel} from "../models/common";
import {getErrorStatus} from "../utils/errors-utils";

export const blogsRouter = Router({});

blogsRouter.get(
	"/",
	async (req: TypedRequestQuery<BlogsQueryParamsModel>, res: Response<BlogViewModel[]>) => {
		try {
			const blogs = await blogsService.getAllBlogs();
			res.status(200).send(blogs)
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.get(
	"/:id",
	async (req: TypedRequestParams<IdParamModel>, res: Response<BlogViewModel>) => {
		try {
			const blog = await blogsService.getBlogById(req.params.id);
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
	async (req: TypedRequestBody<CreateBlogModel>, res: Response<BlogViewModel>) => {
		try {
			const newBlog = await blogsService.createBlog(req.body);
			res.status(201).send(newBlog);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.put(
	"/:id",
	checkAuthorization,
	blogRequestBodyValidation,
	requestErrorsValidation,
	async (req: Request<IdParamModel, {}, UpdateBlogModel>, res: Response) => {
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
	async(req: TypedRequestParams<IdParamModel>, res: Response) => {
		try {
			await blogsService.deleteBlog(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});