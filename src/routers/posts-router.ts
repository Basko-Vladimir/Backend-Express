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
	UpdatePostInputModel
} from "../models/posts/input-models";
import {BlogAllPostsOutputModel} from "../models/blogs/output-models";
import {CreateCommentInputModel} from "../models/comments/input-models";
import {CommentOutputModel, CommentQueryParamsOutputModel} from "../models/comments/output-models";
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {postIdParamValidation} from "../middlewares/posts/post-id-param-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {commentRequestBodyValidation} from "../middlewares/comments/comment-request-body-validation";
import {queryCommentsRepository} from "../repositories/comments/query-comments-repository";
import {queryBlogsRepository} from "../repositories/blogs/query-blogs-repository";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";

class PostsController {
	async getAllPosts(req: TypedRequestQuery<PostsQueryParamsOutputModel>, res: Response<BlogAllPostsOutputModel>) {
		try {
			const postsOutputModel = await queryPostsRepository.getAllPosts(req.query);
			res.status(200).send(postsOutputModel);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async getPostById (req: TypedRequestParams<ParamIdInputModel>, res: Response<PostOutputModel>) {
		try {
			const post = await queryPostsRepository.getPostById(req.params.id);
			res.status(200).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createPost (req: TypedRequestBody<CreatePostInputModel>, res: Response<PostOutputModel>) {
		try {
			const {name: blogName} = await queryBlogsRepository.getBlogById(req.body.blogId);
			const createdPostId = await postsService.createPost({...req.body, blogName});
			const post = await queryPostsRepository.getPostById(createdPostId);
			res.status(201).send(post);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async updatePost(req: Request<ParamIdInputModel, {}, UpdatePostInputModel>, res: Response<void>) {
		try {
			await postsService.updatePost({...req.body, ...req.params});
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deletePost (req: TypedRequestParams<ParamIdInputModel>, res: Response) {
		try {
			await postsService.deletePost(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createCommentByPostId(req: Request<ParamPostIdInputModel, {}, CreateCommentInputModel>, res: Response<CommentOutputModel>) {
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
	}
	
	async getAllCommentsByPostId (
		req: Request<ParamPostIdInputModel, {}, {}, CommentQueryParamsOutputModel>,
		res: Response<PostAllCommentsOutputModel>
	) {
		try {
			const allCommentsByPostId = await queryCommentsRepository
				.getAllCommentsByPostId(req.query, req.params.postId);
			
			res.status(200).send(allCommentsByPostId);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}

export const postsRouter = Router({});
export const postsController = new PostsController();

postsRouter.get("/", commonQueryParamsSanitization, postsController.getAllPosts);
postsRouter.delete("/:id", basicAuthValidation, postsController.deletePost);
postsRouter.get("/:id", postsController.getPostById);

postsRouter.post(
	"/",
	basicAuthValidation,
	postRequestFullBodyValidation,
	requestErrorsValidation,
	postsController.createPost
);

postsRouter.put(
	"/:id",
	basicAuthValidation,
	postRequestFullBodyValidation,
	requestErrorsValidation,
	postsController.updatePost
);

postsRouter.post(
	"/:postId/comments",
	bearerAuthValidation,
	postIdParamValidation,
	commentRequestBodyValidation,
	requestErrorsValidation,
	postsController.createPost
);

postsRouter.get(
	"/:postId/comments",
	postIdParamValidation,
	commonQueryParamsSanitization,
	postsController.getAllCommentsByPostId
);
