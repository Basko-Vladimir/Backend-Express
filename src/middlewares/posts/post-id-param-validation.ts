import {Request, Response, NextFunction} from "express";
import {ParamPostIdInputModel} from "../../models/posts/input-models";
import {getErrorStatus} from "../../controllers/utils";
import {postsService} from "../../composition-root";

export const postIdParamValidation = async (
	req: Request<ParamPostIdInputModel, {}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	if (!req.params.postId) {
		res.sendStatus(404);
		return;
	}
	
	try {
		const post = await postsService.getPostById(req.params.postId);
		post ? next() : res.sendStatus(404);
	} catch (err) {
		res.sendStatus(getErrorStatus(err))
	}
};
