import {Router} from "express";
import {basicAuthValidation} from "../middlewares/basic-auth-validation";
import {postRequestFullBodyValidation} from "../middlewares/posts/post-request-full-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {postIdParamValidation} from "../middlewares/posts/post-id-param-validation";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {commentRequestBodyValidation} from "../middlewares/comments/comment-request-body-validation";
import {commonQueryParamsSanitization} from "../middlewares/query-params-sanitization";
import {iocContainer} from "../composition-root";
import {PostsController} from "../controllers/posts-controller";

export const postsRouter = Router({});
const postsController = iocContainer.resolve(PostsController);

postsRouter.get("/", commonQueryParamsSanitization, postsController.getAllPosts.bind(postsController));
postsRouter.delete("/:id", basicAuthValidation, postsController.deletePost.bind(postsController));
postsRouter.get("/:id", postsController.getPostById.bind(postsController));

postsRouter.post(
	"/",
	basicAuthValidation,
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
