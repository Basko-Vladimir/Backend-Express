import {Request, Response, NextFunction} from "express";
import {ParamBlogIdInputModel} from "../../models/blogs/input-models";

export const blogIdParamValidation = (
	req: Request<ParamBlogIdInputModel, {}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	req.params.blogId ? next() : res.sendStatus(404);
};
