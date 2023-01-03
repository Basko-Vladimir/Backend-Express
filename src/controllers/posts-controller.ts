import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import { ObjectId } from "mongodb";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {PostAllCommentsOutputModel, PostOutputModel, PostsQueryParamsOutputModel} from "../models/posts/output-models";
import {BlogAllPostsOutputModel} from "../models/blogs/output-models";
import {QueryPostsRepository} from "../repositories/posts/query-posts-repository";
import {QueryBlogsRepository} from "../repositories/blogs/query-blogs-repository";
import {getErrorStatus} from "./utils";
import {ParamIdInputModel} from "../models/common-models";
import {CreatePostInputModel, ParamPostIdInputModel, UpdatePostInputModel} from "../models/posts/input-models";
import {PostsService} from "../services/posts-service";
import {CreateCommentInputModel} from "../models/comments/input-models";
import {CommentOutputModel, CommentQueryParamsOutputModel} from "../models/comments/output-models";
import {QueryCommentsRepository} from "../repositories/comments/query-comments-repository";
import {CommentDataDTO} from "../classes/comments";

@injectable()
export class PostsController {
	constructor (
		@inject(PostsService) protected postsService: PostsService,
		@inject(QueryPostsRepository) protected queryPostsRepository: QueryPostsRepository,
		@inject(QueryBlogsRepository) protected queryBlogsRepository: QueryBlogsRepository,
		@inject(QueryCommentsRepository) protected queryCommentsRepository: QueryCommentsRepository
	) {}
	
	async getAllPosts(req: TypedRequestQuery<PostsQueryParamsOutputModel>, res: Response<BlogAllPostsOutputModel>) {
		try {
			const postsOutputModel = await this.queryPostsRepository.getAllPosts(req.query);
			res.status(200).send(postsOutputModel);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async getPostById (req: TypedRequestParams<ParamIdInputModel>, res: Response<PostOutputModel>) {
		try {
			const post = await this.queryPostsRepository.getPostById(req.params.id);
			res.status(200).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createPost (req: TypedRequestBody<CreatePostInputModel>, res: Response<PostOutputModel>) {
		try {
			const {name: blogName} = await this.queryBlogsRepository.getBlogById(req.body.blogId);
			const createdPostId = await this.postsService.createPost({...req.body, blogName});
			const post = await this.queryPostsRepository.getPostById(createdPostId);
			res.status(201).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async updatePost(req: Request<ParamIdInputModel, {}, UpdatePostInputModel>, res: Response<void>) {
		try {
			await this.postsService.updatePost(req.params.id, {...req.body});
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deletePost (req: TypedRequestParams<ParamIdInputModel>, res: Response) {
		try {
			await this.postsService.deletePost(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createCommentByPostId(req: Request<ParamPostIdInputModel, {}, CreateCommentInputModel>, res: Response<CommentOutputModel>) {
		try {
			const { user } = req.context;
			const commentData: CommentDataDTO = {
				content: req.body.content,
				userId: user!._id,
				userLogin: user!.login,
				postId: new ObjectId(req.params.postId)
				
			};
			const commentId = await this.postsService.createCommentByPostId(commentData);
			const comment = await this.queryCommentsRepository.getCommentById(commentId);
			res.status(201).send(comment);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async getAllCommentsByPostId (
		req: Request<ParamPostIdInputModel, {}, {}, CommentQueryParamsOutputModel>,
		res: Response<PostAllCommentsOutputModel>
	) {
		try {
			const allCommentsByPostId = await this.queryCommentsRepository
				.getAllCommentsByPostId(req.query, req.params.postId);
			
			res.status(200).send(allCommentsByPostId);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}