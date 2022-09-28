import {Request, Response, Router} from "express";
import {blogsService} from "../services/blogs-service";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
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
import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../common/interfaces";
import {EMPTY_SEARCH_VALUE} from "../common/constants";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";

class BlogsController {
	async getAllBlogs (req: TypedRequestQuery<BlogsQueryParamsOutputModel>, res: Response<AllBlogsOutputModel>) {
		try {
			const {searchNameTerm} = req.query;
			const blogsOutputModel = await queryBlogsRepository.getAllBlogs({
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
			const blog = await queryBlogsRepository.getBlogById(req.params.id);
			res.status(200).send(blog);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createBlog (req: TypedRequestBody<CreateBlogInputModel>, res: Response<BlogOutputModel>) {
		try {
			const createdBlogId = await blogsService.createBlog(req.body);
			const createdBlog = await queryBlogsRepository.getBlogById(createdBlogId);
			res.status(201).send(createdBlog);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async updateBlog (req: Request<ParamIdInputModel, {}, UpdateBlogInputModel>, res: Response) {
		try {
			await blogsService.updateBlog(req.params.id, req.body);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async deleteBlog (req: TypedRequestParams<ParamIdInputModel>, res: Response) {
		try {
			await blogsService.deleteBlog(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
	
	async createPostByBlogId (req: Request<ParamBlogIdInputModel, {}, CreateBlogPostInputModel>, res: Response<PostOutputModel>) {
		try {
			const postId = await blogsService.createPostByBlogId(req.params.blogId, req.body);
			const post = await queryPostsRepository.getPostById(postId);
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
			const allPostsByBlogId = await queryPostsRepository.getAllPostsByBlogId(req.query, req.params.blogId);
			res.status(200).send(allPostsByBlogId);
		} catch (error) {
			res.sendStatus(getErrorStatus(error));
		}
	}
}

export const blogsRouter = Router({});
export const blogsController = new BlogsController();

blogsRouter.get("/", commonQueryParamsSanitization, blogsController.getAllBlogs);
blogsRouter.get("/:id", blogsController.getBlogById);

blogsRouter.post("/",
	basicAuthValidation,
	blogRequestBodyValidation,
	requestErrorsValidation,
	blogsController.createBlog
);

blogsRouter.put("/:id",
	basicAuthValidation,
	blogRequestBodyValidation,
	requestErrorsValidation,
	blogsController.updateBlog
);

blogsRouter.delete("/:id",
	basicAuthValidation,
	requestErrorsValidation,
	blogsController.deleteBlog
);

blogsRouter.post("/:blogId/posts",
	basicAuthValidation,
	blogIdParamValidation,
	postBodyCommonFieldsValidation,
	requestErrorsValidation,
	blogsController.createPostByBlogId
);

blogsRouter.get("/:blogId/posts",
	blogIdParamValidation,
	commonQueryParamsSanitization,
	blogsController.getAllPostsByBlogId
);
