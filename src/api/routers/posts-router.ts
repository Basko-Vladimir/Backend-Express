import {Router} from "express";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {postRequestFullBodyValidation} from "../middlewares/posts/post-request-full-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {postIdParamValidation} from "../middlewares/posts/post-id-param-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {commentRequestBodyValidation} from "../middlewares/comments/comment-request-body-validation";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";
import {likesInputDataValidation} from "../middlewares/comments/likes-input-data-validation";
import {iocContainer} from "../../composition-root";
import {PostsController} from "../controllers/posts-controller";
import {parseUserToken} from "../middlewares/parse-user-token";

export const postsRouter = Router({});
const postsController = iocContainer.resolve(PostsController);

postsRouter.get(
	"/",
	parseUserToken,
	commonQueryParamsSanitization,
	postsController.getAllPosts.bind(postsController) as any
);

postsRouter.get(
	"/:id",
	parseUserToken,
	postsController.getPostById.bind(postsController)
);

postsRouter.delete("/:id", basicAuthValidation, postsController.deletePost.bind(postsController));

postsRouter.post(
	"/",
	basicAuthValidation,
	parseUserToken,
	postRequestFullBodyValidation,
	requestErrorsValidation,
	postsController.createPost.bind(postsController)
);

postsRouter.put(
	"/:id",
	basicAuthValidation,
	postRequestFullBodyValidation,
	requestErrorsValidation,
	postsController.updatePost.bind(postsController)
);

postsRouter.post(
	"/:postId/comments",
	bearerAuthValidation,
	postIdParamValidation,
	commentRequestBodyValidation,
	requestErrorsValidation,
	postsController.createCommentByPostId.bind(postsController)
);

postsRouter.get(
	"/:postId/comments",
	postIdParamValidation,
	commonQueryParamsSanitization,
	postsController.getAllCommentsByPostId.bind(postsController)
);

postsRouter.put(
	"/:postId/like-status",
	postIdParamValidation,
	bearerAuthValidation,
	likesInputDataValidation,
	requestErrorsValidation,
	postsController.updatePostLikeStatus.bind(postsController)
);