// import {Request, Response, Router} from "express";
// import {CreatePostModel, InputPostsQueryParamsModel, PostViewModel, UpdatePostModel} from "../models/post-models";
// import {getErrorStatus} from "../utils/errors-utils";
// import {postsService} from "../services/posts-service";
// import {TypedRequestBody, TypedRequestParams, TypedRequestQuery} from "../interfaces/common-interfaces";
// import {setQueryParamsValues} from "../utils/query-params-utils";
// import {OutputPostQueriesParams} from "../interfaces/posts-interfaces";
// import {checkAuthorization} from "../middlewares/check-authorization";
// import {checkPostRequestBody} from "../middlewares/posts/post-request-body-validation";
// import {requestErrorsValidation} from "../middlewares/request-errors-validation";
// import {IdParamModel} from "../models/common-models";
//
// export const postsRouter = Router({});
//
// postsRouter.get(
// 	"/",
// 	async (req: TypedRequestQuery<InputPostsQueryParamsModel>, res: Response<PostViewModel[]>) => {
// 		try {
// 			const queryParams = setQueryParamsValues<OutputPostQueriesParams>(req.query)
// 			const posts = await postsService.getPosts(queryParams);
// 			res.status(200).send(posts);
// 		}	catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});
//
// postsRouter.get(
// 	"/:id",
// 	async (req: TypedRequestParams<IdParamModel>, res: Response<PostViewModel>) => {
// 		try {
// 			const post = await postsService.getPostById(req.params.id);
// 			res.status(200).send(post);
// 		} catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});
//
// postsRouter.delete(
// 	"/:id",
// 	checkAuthorization,
// 	requestErrorsValidation,
// 	async (req: TypedRequestParams<IdParamModel>, res: Response) => {
// 		try {
// 			await postsService.deletePost(req.params.id);
// 			res.sendStatus(204);
// 		} catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});
//
// postsRouter.put(
// 	"/:id",
// 	checkAuthorization,
// 	checkPostRequestBody,
// 	requestErrorsValidation,
// 	async (req: Request<IdParamModel, {}, UpdatePostModel>, res: Response<void>) => {
// 		try {
// 			await postsService.updatePost(req.params.id, req.body);
// 			res.sendStatus(204);
// 		} catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});
//
// postsRouter.post(
// 	"/",
// 	checkAuthorization,
// 	checkPostRequestBody,
// 	requestErrorsValidation,
// 	async (req: TypedRequestBody<CreatePostModel>, res: Response<PostViewModel>) => {
// 		try {
// 			const post = await postsService.createPost(req.body)
// 			res.status(201).send(post);
// 		} catch (error) {
// 			res.sendStatus(getErrorStatus(error));
// 		}
// 	});
