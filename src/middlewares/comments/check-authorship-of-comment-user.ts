import {Request, Response, NextFunction} from "express";
import {queryCommentsRepository} from "../../repositories/comments/query-comments-repository";
import {ParamCommentIdInputModel} from "../../models/comments/input-models";
import {getErrorStatus} from "../../routers/utils";

export const checkAuthorshipOfCommentUser = async (
	req: Request<ParamCommentIdInputModel>,
	res: Response,
	next: NextFunction
) => {
	try {
		const comment = await queryCommentsRepository.getCommentById(req.params.commentId);
		
		if (comment.userId === String(req.user!._id)) {
			next();
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		res.sendStatus(getErrorStatus(error))
	}
};
