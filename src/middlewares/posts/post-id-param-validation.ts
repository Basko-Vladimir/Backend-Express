import {Request, Response, NextFunction} from "express";
import {ParamPostIdInputModel} from "../../models/posts/input-models";
import {postsService} from "../../services/posts-service";

export const postIdParamValidation = async (
	req: Request<ParamPostIdInputModel, {}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	if (!req.params.postId) {
		res.sendStatus(404);
		return;
	}
	
	const post = await postsService.getPostById(req.params.postId);
	post ? next() : res.sendStatus(404);
};
