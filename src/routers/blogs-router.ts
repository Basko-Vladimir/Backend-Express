import {Request, Response, Router} from "express";
import {blogsService} from "../services/blogs-service";
import {checkAuthorization} from "../middlewares/check-authorization";
import {blogRequestBodyValidation} from "../middlewares/blogs/blog-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {ParamIdInputModel} from "../models/common-models";
import {
	AllBlogsOutputModel,
	BlogAllPostsOutputModel,
	BlogOutputModel,
	BlogsQueryParamsOutputModel
} from "../models/blogs/output-models";
import {getErrorStatus} from "./utils";
import {
	BlogsQueryParamsInputModel,
	CreateBlogInputModel,
	CreateBlogPostInputModel,
	ParamBlogIdInputModel,
	UpdateBlogInputModel
} from "../models/blogs/input-models";
import {queryBlogsRepository} from "../repositories/blogs/query-blogs-repository";
import {postBodyCommonFieldsValidation} from "../middlewares/posts/post-body-common-fields-validation";
import {PostOutputModel, PostsQueryParamsOutputModel} from "../models/posts/output-models";
import {queryPostsRepository} from "../repositories/posts/query-posts-repository";
import {blogIdParamValidation} from "../middlewares/blogs/blog-id-param-validation";
import {BlogSortByField, PostSortByField, SortDirection} from "../models/enums";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, EMPTY_SEARCH_VALUE} from "../common/constants";
import {PostsQueryParamsInputModel} from "../models/posts/input-models";

export const blogsRouter = Router({});

blogsRouter.get(
	"/",
	async (req: TypedRequestQuery<BlogsQueryParamsInputModel>, res: Response<AllBlogsOutputModel>) => {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize, searchNameTerm } = req.query;
			const queryParamsData: BlogsQueryParamsOutputModel = {
				sortBy: sortBy || BlogSortByField.createdAt,
				sortDirection: sortDirection ? SortDirection[sortDirection] : SortDirection.desc,
				pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
				pageNumber: Number(pageNumber) || DEFAULT_PAGE_NUMBER,
				searchNameTerm: searchNameTerm || EMPTY_SEARCH_VALUE
			};
			
			const blogsOutputModel = await queryBlogsRepository.getAllBlogs(queryParamsData);
			res.status(200).send(blogsOutputModel);
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

blogsRouter.post(
	"/:blogId/posts",
	checkAuthorization,
	blogIdParamValidation,
	postBodyCommonFieldsValidation,
	requestErrorsValidation,
	async (req: Request<ParamBlogIdInputModel, {}, CreateBlogPostInputModel>, res: Response<PostOutputModel>) => {
		try {
			const postId = await blogsService.createPostByBlogId(req.params.blogId, req.body);
			const post = await queryPostsRepository.getPostById(postId);
			res.status(201).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});

blogsRouter.get(
	"/:blogId/posts",
	blogIdParamValidation,
	async (
		req: Request<ParamBlogIdInputModel, {}, {}, PostsQueryParamsInputModel>,
		res: Response<BlogAllPostsOutputModel>
	) => {
		try {
			const { sortBy, sortDirection, pageNumber, pageSize } = req.query;
			const queryParamsData: PostsQueryParamsOutputModel = {
				sortBy: sortBy || PostSortByField.createdAt,
				sortDirection: sortDirection ? SortDirection[sortDirection] : SortDirection.desc,
				pageNumber: Number(pageNumber) || DEFAULT_PAGE_NUMBER,
				pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
			};
			const allPostsByBlogId = await queryPostsRepository
				.getAllPostsByBlogId(queryParamsData, req.params.blogId);

			res.status(200).send(allPostsByBlogId);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	});
