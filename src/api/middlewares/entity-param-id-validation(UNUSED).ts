import {Response, NextFunction} from "express";
import {TypedRequestParams} from "../../common/interfaces";

export const entityIdParamValidation = <P, T>(
	param: keyof P,
	callback: (id: string) => Promise<T | null>
) => async (req: TypedRequestParams<P>, res: Response, next: NextFunction) => {
	if (!req.params[param]) {
		res.sendStatus(404);
		return;
	}

	const post: Awaited<T> | null = await callback(req.params[param] as string);
	post ? next() : res.sendStatus(404);
};
