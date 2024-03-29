import {Request, Response, NextFunction} from "express";
import {ParamCommentIdInputModel} from "../../models/comments/input-models";
import {getErrorStatus} from "../../controllers/utils";
import {iocContainer} from "../../../composition-root";
import {CommentsService} from "../../../application/services/comments-service";

const commentsService = iocContainer.resolve(CommentsService);

export const checkAuthorshipOfCommentUser = async (
	req: Request<ParamCommentIdInputModel>,
	res: Response,
	next: NextFunction
) => {
	try {
		const comment = await commentsService.getCommentById(req.params.commentId);
		
		if (String(comment.userId) === String(req.context.user!._id)) {
			next();
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		res.sendStatus(getErrorStatus(error))
	}
};
