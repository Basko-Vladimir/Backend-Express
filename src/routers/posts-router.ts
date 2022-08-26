import { Router, Response, Request } from "express";
import {checkExistingId} from "../middlewares/check-excisting-id";
import {validationRequestErrors} from "../middlewares/validation-request-errors";
import {postsRepository} from "../repositories/posts-repository";
import {checkAuthorization} from "../middlewares/check-authorization";
import {checkPostRequestBody} from "../middlewares/posts/check-post-request-body";
import {IPostData} from "../interfaces/posts-interfaces";


export const postsRouter = Router({});

postsRouter.get("/", (req: Request, res: Response) => {
	const posts = postsRepository.getAllPosts();
	res.status(200).send(posts);
});

postsRouter.get(
	"/:id",
	checkExistingId,
	validationRequestErrors,
	(req: Request<{id: string}>, res:Response) => {
		const post = postsRepository.getPostById(req.params.id);
		post ? res.status(200).send(post) : res.send(404);
	}
);

postsRouter.delete(
	"/:id",
	checkAuthorization,
	checkExistingId,
	validationRequestErrors,
	(req: Request<{id: string}>, res: Response) => {
		const isDeleted = postsRepository.deletePost(req.params.id);
		isDeleted ? res.send(204) : res.send(404);
	}
);

postsRouter.post(
	"/",
	checkAuthorization,
	checkPostRequestBody,
	validationRequestErrors,
	(req: Request<{}, {}, IPostData>, res: Response) => {
		const newPost = postsRepository.createPost(req.body);
		res.status(201).send(newPost);
	}
);

postsRouter.put(
	"/:id",
	checkAuthorization,
	checkExistingId,
	checkPostRequestBody,
	validationRequestErrors,
	(req: Request<{id: string}, {}, IPostData>, res: Response) => {
		postsRepository.updatePost(req.params.id, req.body) ? res.send(204) : res.send(404);
	}
);

