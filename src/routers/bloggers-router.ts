import { Request,Response, Router } from "express";
import { bloggersRepository } from "../repositories/bloggers/db-bloggers-repository";
import { checkExistingId } from "../middlewares/check-excisting-id";
import { validationRequestErrors } from "../middlewares/validation-request-errors";
import { checkAuthorization } from "../middlewares/check-authorization";
import { checkBloggerRequestBody } from "../middlewares/bloggers/check-blogger-request-body";

export const bloggersRouter = Router({});

bloggersRouter.get("/", async (req: Request, res: Response) => {
	const bloggers = await bloggersRepository.getAllBloggers();
	res.status(200).send(bloggers);
});

bloggersRouter.get("/:id", async (req: Request<{id: string}>, res: Response) => {
	const blogger = await bloggersRepository.getBloggerById(req.params.id);
	blogger ? res.status(200).send(blogger) : res.send(404);
});

bloggersRouter.delete(
	"/:id",
	checkAuthorization,
	checkExistingId,
	validationRequestErrors,
	async (req: Request<{id: string}>, res: Response) => {
		await bloggersRepository.deleteBlogger(req.params.id) ? res.send(204) : res.send(404);
	}
);

bloggersRouter.post(
	"/",
	checkAuthorization,
	checkBloggerRequestBody,
	validationRequestErrors,
	async (req: Request<{}, {}, {name: string, youtubeUrl: string}>, res: Response) => {
		const newBlogger = await bloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl);
		res.status(201).send(newBlogger);
	}
);

bloggersRouter.put(
	"/:id",
	checkAuthorization,
	checkExistingId,
	checkBloggerRequestBody,
	validationRequestErrors,
	async(req: Request<{id: string}, {}, {name: string, youtubeUrl: string}>, res: Response) => {
		await bloggersRepository.updateBlogger(req.params.id, req.body.name, req.body.youtubeUrl)
		 	? res.send(204)
			: res.send(404);
	}
)
