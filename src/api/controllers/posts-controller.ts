import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import { ObjectId } from "mongodb";
import {getErrorStatus, getFullCommentOutputModel, getFullPostOutputModel} from "./utils";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../../common/interfaces";
import {
	FullPostOutputModel,
	PostAllFullCommentsOutputModel,
	PostOutputModel,
	PostsQueryParamsOutputModel
} from "../models/posts/output-models";
import {BlogAllPostsOutputModel} from "../models/blogs/output-models";
import {CommentDataDTO, CreateCommentInputModel} from "../models/comments/input-models";
import {ParamIdInputModel} from "../models/common-models";
import {CreatePostInputModel, ParamPostIdInputModel, UpdatePostInputModel} from "../models/posts/input-models";
import {
	CommentQueryParamsOutputModel,
	FullCommentOutputModel
} from "../models/comments/output-models";
import {UpdateLikeStatusInputModel} from "../models/likes/input-models";
import {QueryPostsRepository} from "../../infrastructure/repositories/posts/query-posts-repository";
import {QueryBlogsRepository} from "../../infrastructure/repositories/blogs/query-blogs-repository";
import {QueryCommentsRepository} from "../../infrastructure/repositories/comments/query-comments-repository";
import {QueryLikesRepository} from "../../infrastructure/repositories/likes/query-likes-repository";
import {PostsService} from "../../application/services/posts-service";
import { JwtService } from "../../application/services/jwt-service";
import { UsersService } from "../../application/services/users-service";

@injectable()
export class PostsController {
	constructor (
		@inject(PostsService) protected postsService: PostsService,
		@inject(QueryPostsRepository) protected queryPostsRepository: QueryPostsRepository,
		@inject(QueryBlogsRepository) protected queryBlogsRepository: QueryBlogsRepository,
		@inject(QueryCommentsRepository) protected queryCommentsRepository: QueryCommentsRepository,
		@inject(QueryLikesRepository) protected queryLikesRepository: QueryLikesRepository,
		@inject(JwtService) protected jwtService: JwtService,
		@inject(UsersService) protected usersService: UsersService,
	) {}
	
	async getAllPosts(req: TypedRequestQuery<PostsQueryParamsOutputModel>, res: Response<BlogAllPostsOutputModel>) {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			const tokenPayload = token && await this.jwtService.getTokenPayload(token);
			const user = tokenPayload && await this.usersService.getUserById(tokenPayload.userId);
			const userId = user ? String(user._id) : null;
			
			const postsOutputModel = await this.queryPostsRepository.getAllPosts(req.query);
			const posts = postsOutputModel.items;
			const fullPosts = [];
			
			for (let i = 0; i < posts.length; i++) {
				const extendedPostLikesInfo = await this.queryLikesRepository.getExtendedLikesInfo(posts[i].id, userId)
				fullPosts.push(getFullPostOutputModel(posts[i], extendedPostLikesInfo));
			}
			
			res
				.status(200)
				.send({
					...postsOutputModel,
					items: fullPosts
				});
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async getPostById (req: TypedRequestParams<ParamIdInputModel>, res: Response<PostOutputModel>) {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			const tokenPayload = token && await this.jwtService.getTokenPayload(token);
			const user = tokenPayload && await this.usersService.getUserById(tokenPayload.userId);
			const userId = user ? String(user._id) : null;
			
			const post = await this.queryPostsRepository.getPostById(req.params.id);
			const extendedLikesInfo = await this.queryLikesRepository.getExtendedLikesInfo(post.id, userId);
			const result = getFullPostOutputModel(post, extendedLikesInfo);
			
			res.status(200).send(result);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createPost (req: TypedRequestBody<CreatePostInputModel>, res: Response<FullPostOutputModel>) {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			const tokenPayload = token && await this.jwtService.getTokenPayload(token);
			const user = tokenPayload && await this.usersService.getUserById(tokenPayload.userId);
			const userId = user ? String(user._id) : null;
			
			const { blogId, ...restProps } = req.body;
			const createdPostId = await this.postsService.createPost(blogId, restProps);
			const post = await this.queryPostsRepository.getPostById(createdPostId);
			const extendedLikesInfo = await this.queryLikesRepository.getExtendedLikesInfo(createdPostId, userId);
			const result = getFullPostOutputModel(post, extendedLikesInfo);
			
			res.status(201).send(result);
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
	
	async createCommentByPostId(req: Request<ParamPostIdInputModel, {}, CreateCommentInputModel>, res: Response<FullCommentOutputModel>) {
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
			const likesInfo = await this.queryLikesRepository.getLikesInfo(String(commentData.userId), commentId);
			
			const fullCommentInfo = getFullCommentOutputModel(comment, likesInfo);
			
			res.status(201).send(fullCommentInfo);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async getAllCommentsByPostId (
		req: Request<ParamPostIdInputModel, {}, {}, CommentQueryParamsOutputModel>,
		res: Response<PostAllFullCommentsOutputModel>
	) {
		try {
			const allCommentsByPostId = await this.queryCommentsRepository.getAllCommentsByPostId(req.query, req.params.postId);
			const comments = allCommentsByPostId.items;
			const fullComments = [];
			
			for (let i = 0; i < comments.length; i++) {
				const commentLikesInfo = await this.queryLikesRepository.getLikesInfo(comments[i].userId, comments[i].id)
				fullComments.push(getFullCommentOutputModel(comments[i], commentLikesInfo));
			}
			
			res
				.status(200)
				.send({
					...allCommentsByPostId,
					items: fullComments
				});
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async updatePostLikeStatus(
		req: Request<ParamPostIdInputModel, {}, UpdateLikeStatusInputModel>,
		res: Response<void>
	) {
		try {
			await this.postsService.updatePostLikeStatus(req.context.user!, req.params.postId, req.body.likeStatus);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}