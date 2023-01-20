import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus, getFullPostOutputModel} from "./utils";
import {EMPTY_SEARCH_VALUE} from "../../common/constants";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../../common/interfaces";
import {ParamIdInputModel} from "../models/common-models";
import {PostOutputModel, PostsQueryParamsOutputModel} from "../models/posts/output-models";
import {
	CreateBlogInputModel,
	ParamBlogIdInputModel,
	CreateBlogPostInputModel,
	UpdateBlogInputModel,
	BlogsQueryParamsInputModel
} from "../models/blogs/input-models";
import {
	AllBlogsOutputModel,
	BlogAllPostsOutputModel,
	BlogOutputModel
} from "../models/blogs/output-models";
import {BlogsService} from "../../application/services/blogs-service";
import {QueryBlogsRepository} from "../../infrastructure/repositories/blogs/query-blogs-repository";
import {QueryPostsRepository} from "../../infrastructure/repositories/posts/query-posts-repository";
import { QueryLikesRepository } from "../../infrastructure/repositories/likes/query-likes-repository";

@injectable()
export class BlogsController {
	constructor(
		@inject(BlogsService) protected blogsService: BlogsService,
		@inject(QueryBlogsRepository) protected queryBlogsRepository: QueryBlogsRepository,
		@inject(QueryPostsRepository) protected queryPostsRepository: QueryPostsRepository,
		@inject(QueryLikesRepository) protected queryLikesRepository: QueryLikesRepository
	) {}
	
	async getAllBlogs (req: TypedRequestQuery<BlogsQueryParamsInputModel>, res: Response<AllBlogsOutputModel>) {
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
			const extendedLikesInfo = await this.queryLikesRepository.getExtendedLikesInfo(postId);
			const result = getFullPostOutputModel(post, extendedLikesInfo);
			
			res.status(201).send(result);
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
			const posts = allPostsByBlogId.items;
			const fullPosts = [];
			
			for (let i = 0; i < posts.length; i++) {
				const extendedPostLikesInfo = await this.queryLikesRepository.getExtendedLikesInfo(posts[i].id)
				fullPosts.push(getFullPostOutputModel(posts[i], extendedPostLikesInfo));
			}
			
			res
				.status(200)
				.send({
					...allPostsByBlogId,
					items: fullPosts
				});
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}
