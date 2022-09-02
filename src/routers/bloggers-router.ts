import { Request,Response, Router } from "express";
import { memoryBloggersRepository } from "../repositories/bloggers/memory-bloggers-repository";
import { checkExistingId } from "../middlewares/check-excisting-id";
import { validationRequestErrors } from "../middlewares/validation-request-errors";
import { checkAuthorization } from "../middlewares/check-authorization";
import { checkBloggerRequestBody } from "../middlewares/bloggers/check-blogger-request-body";

export const bloggersRouter = Router({});

bloggersRouter.get("/", (req: Request, res: Response) => {
	const bloggers = memoryBloggersRepository.getAllBloggers();
	res.status(200).send(bloggers);
});

bloggersRouter.get("/:id", (req: Request<{id: string}>, res: Response) => {
	const blogger = memoryBloggersRepository.getBloggerById(+req.params.id);
	blogger ? res.status(200).send(blogger) : res.send(404);
});

bloggersRouter.delete(
	"/:id",
	checkAuthorization,
	checkExistingId,
	validationRequestErrors,
	(req: Request<{id: string}>, res: Response) => {
		memoryBloggersRepository.deleteBlogger(+req.params.id) ? res.send(204) : res.send(404);
	}
);

bloggersRouter.post(
	"/",
	checkAuthorization,
	checkBloggerRequestBody,
	validationRequestErrors,
	(req: Request<{}, {}, {name: string, youtubeUrl: string}>, res: Response) => {
		const newBlogger = memoryBloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl);
		res.status(201).send(newBlogger);
	}
);

bloggersRouter.put(
	"/:id",
	checkAuthorization,
	checkExistingId,
	checkBloggerRequestBody,
	validationRequestErrors,
	(req: Request<{id: string}, {}, {name: string, youtubeUrl: string}>, res: Response) => {
		memoryBloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
		 	? res.send(204)
			: res.send(404);
	}
)
