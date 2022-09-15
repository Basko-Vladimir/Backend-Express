import {Request, Response, NextFunction} from "express";
import {ParamBlogIdInputModel} from "../../models/blogs/input-models";
import {blogsService} from "../../services/blogs-service";

export const blogIdParamValidation = async (
	req: Request<ParamBlogIdInputModel, {}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	if (!req.params.blogId) {
		res.sendStatus(404);
		return;
	}
	
	const blog = await blogsService.getBlogById(req.params.blogId);
	blog ? next() : res.sendStatus(404);
};
