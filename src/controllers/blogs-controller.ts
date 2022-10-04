import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {
	AllBlogsOutputModel,
	BlogAllPostsOutputModel,
	BlogOutputModel,
	BlogsQueryParamsOutputModel
} from "../models/blogs/output-models";
import {QueryBlogsRepository} from "../repositories/blogs/query-blogs-repository";
import {EMPTY_SEARCH_VALUE} from "../common/constants";
import {getErrorStatus} from "./utils";
import {ParamIdInputModel} from "../models/common-models";
import {
	CreateBlogInputModel,
	CreateBlogPostInputModel,
	ParamBlogIdInputModel,
	UpdateBlogInputModel
} from "../models/blogs/input-models";
import {BlogsService} from "../services/blogs-service";
import {PostOutputModel, PostsQueryParamsOutputModel} from "../models/posts/output-models";
import {QueryPostsRepository} from "../repositories/posts/query-posts-repository";

@injectable()
export class BlogsController {
	constructor(
		@inject(BlogsService) protected blogsService: BlogsService,
		@inject(QueryBlogsRepository) protected queryBlogsRepository: QueryBlogsRepository,
		@inject(QueryPostsRepository) protected queryPostsRepository: QueryPostsRepository
	) {}
	
	async getAllBlogs (req: TypedRequestQuery<BlogsQueryParamsOutputModel>, res: Response<AllBlogsOutputModel>) {
		try {
			const {searchNameTerm} = req.query;
			const blogsOutputModel = await this.queryBlogsRepository.getAllBlogs({
				...req.query,
				searchNameTerm: searchNameTerm ? searchNameTerm.trim() : EMPTY_SEARCH_VALUE
			});
			res.status(200).send(blogsOutputModel);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async getBlogById (req: TypedRequestParams<ParamIdInputModel>, res: Response<BlogOutputModel>) {
		try {
			const blog = await this.queryBlogsRepository.getBlogById(req.params.id);
			res.status(200).send(blog);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createBlog (req: TypedRequestBody<CreateBlogInputModel>, res: Response<BlogOutputModel>) {
		try {
			const createdBlogId = await this.blogsService.createBlog(req.body);
			const createdBlog = await this.queryBlogsRepository.getBlogById(createdBlogId);
			res.status(201).send(createdBlog);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async updateBlog (req: Request<ParamIdInputModel, {}, UpdateBlogInputModel>, res: Response) {
		try {
			await this.blogsService.updateBlog(req.params.id, req.body);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteBlog (req: TypedRequestParams<ParamIdInputModel>, res: Response) {
		try {
			await this.blogsService.deleteBlog(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createPostByBlogId (req: Request<ParamBlogIdInputModel, {}, CreateBlogPostInputModel>, res: Response<PostOutputModel>) {
		try {
			const postId = await this.blogsService.createPostByBlogId(req.params.blogId, req.body);
			const post = await this.queryPostsRepository.getPostById(postId);
			res.status(201).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async getAllPostsByBlogId(
		req: Request<ParamBlogIdInputModel, {}, {}, PostsQueryParamsOutputModel>,
		res: Response<BlogAllPostsOutputModel>
	) {
		try {
			const allPostsByBlogId = await this.queryPostsRepository.getAllPostsByBlogId(req.query, req.params.blogId);
			res.status(200).send(allPostsByBlogId);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
