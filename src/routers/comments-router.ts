import {Router} from "express";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {checkAuthorshipOfCommentUser} from "../middlewares/comments/check-authorship-of-comment-user";
import {commentRequestBodyValidation} from "../middlewares/comments/comment-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";
import {commentsController} from "../composition-root";

export const commentsRouter = Router({});

commentsRouter.get("/:id", commentsController.getCommentById.bind(commentsController));

commentsRouter.delete(
	"/:commentId",
	bearerAuthValidation,
	checkAuthorshipOfCommentUser,
	commentsController.deleteComment.bind(commentsController)
);

commentsRouter.put(
	"/:commentId",
	bearerAuthValidation,
	checkAuthorshipOfCommentUser,
	commentRequestBodyValidation,
	requestErrorsValidation,
	commentsController.updateComment.bind(commentsController)
);
