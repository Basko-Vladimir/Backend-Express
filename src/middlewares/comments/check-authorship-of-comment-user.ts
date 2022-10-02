import {Request, Response, NextFunction} from "express";
import {ParamCommentIdInputModel} from "../../models/comments/input-models";
import {getErrorStatus} from "../../controllers/utils";
import {commentsService} from "../../composition-root";

export const checkAuthorshipOfCommentUser = async (
	req: Request<ParamCommentIdInputModel>,
	res: Response,
	next: NextFunction
) => {
	try {
		const comment = await commentsService.getCommentById(req.params.commentId);
		
		if (String(comment.userId) === String(req.user!._id)) {
			next();
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		res.sendStatus(getErrorStatus(error))
	}
};
