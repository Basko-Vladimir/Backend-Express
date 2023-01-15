import {Request, Response, NextFunction} from "express";
import {getErrorStatus} from "../../controllers/utils";
import {iocContainer} from "../../../composition-root";
import {ParamCommentIdInputModel} from "../../../application/models/comments/input-models";
import {CommentsService} from "../../../application/services/comments-service";

const commentsService = iocContainer.resolve(CommentsService);

export const commentIdParamValidation = async (
	req: Request<ParamCommentIdInputModel, {}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	if (!req.params.commentId) {
		res.sendStatus(404);
		return;
	}
	
	try {
		const comment = await commentsService.getCommentById(req.params.commentId);
		comment ? next() : res.sendStatus(404);
	} catch (err) {
		res.sendStatus(getErrorStatus(err))
	}
};
