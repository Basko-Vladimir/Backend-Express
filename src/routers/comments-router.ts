import {Router, Response, Request} from "express";
import {getErrorStatus} from "./utils";
import {CommentOutputModel} from "../models/comments/output-models";
import {TypedRequestParams} from "../common/interfaces";
import {ParamIdInputModel} from "../models/common-models";
import {commentsService} from "../services/comments-service";
import {queryCommentsRepository} from "../repositories/comments/query-comments-repository";
import {bearerAuthValidation} from "../middlewares/bearer-auth-validation";
import {CreateCommentInputModel, ParamCommentIdInputModel} from "../models/comments/input-models";
import {checkAuthorshipOfCommentUser} from "../middlewares/comments/check-authorship-of-comment-user";
import {commentRequestBodyValidation} from "../middlewares/comments/comment-request-body-validation";
import {requestErrorsValidation} from "../middlewares/request-errors-validation";

export const commentsRouter = Router({});

commentsRouter.get(
	"/:id",
	async (req: TypedRequestParams<ParamIdInputModel>, res: Response<CommentOutputModel>) => {
		try {
			const comment = await queryCommentsRepository.getCommentById(req.params.id);
			res.status(200).send(comment);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

commentsRouter.delete(
	"/:commentId",
	bearerAuthValidation,
	checkAuthorshipOfCommentUser,
	async (req: TypedRequestParams<ParamCommentIdInputModel>, res: Response<void>) => {
		try {
			await commentsService.deleteComment(req.params.commentId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});

commentsRouter.put(
	"/:commentId",
	bearerAuthValidation,
	checkAuthorshipOfCommentUser,
	commentRequestBodyValidation,
	requestErrorsValidation,
	async (req: Request<ParamCommentIdInputModel, {}, CreateCommentInputModel>, res: Response<void>) => {
		try {
			await commentsService.updateComment(req.params.commentId, req.body.content);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	});
