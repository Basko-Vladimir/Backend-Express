import { Router, Request, Response } from "express";

enum EResolutions {
	P144 = "P144",
	P240 = "P240",
	P360 = "P360",
	P480 = "P480",
	P720 = "P720",
	P1080 = "P1080",
	P1440 = "P1440"
}

interface IVideo {
	id: number;
	title: string;
	author: string;
	canBeDownloaded: boolean;
	minAgeRestriction: number | null;
	createdAt: string;
	publicationDate: string;
	availableResolutions: EResolutions[];
}

export let videos: IVideo[] = [];

export const clearVideos = () => videos = [];
export const videosRouter = Router({});

videosRouter.get("/", (req: Request, res: Response) => {
	res.status(200).send(videos);
});

videosRouter.get("/:id", (req: Request, res: Response) => {
	const expectedVideo = videos.find(video => video.id === +req.params.id);
	
	if (!expectedVideo || !req.params.id) {
		res.send(404)
	} else {
		res.status(200).send(expectedVideo);
	}
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
	const expectedVideoId = videos.findIndex(video => video.id === +req.params.id);
	
	if (!req.params.id || expectedVideoId === -1) {
		res.send(404);
	} else {
		videos.splice(expectedVideoId, 1);
		res.send(204);
	}
});

videosRouter.post("/", (req: Request, res: Response) => {
	const errorsMessages = [];
	const {title, author, availableResolutions } = req.body;
	
	if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
		const error = { message: "Entered title is not correct!", field: "title"};
		errorsMessages.push(error);
	}
	if (!author || typeof author !== "string" || !author.trim() || author.length > 20) {
		const error = { message: "Entered author value is not correct!", field: "author"};
		errorsMessages.push(error);
	}
	if (availableResolutions && (!Array.isArray(availableResolutions) || !availableResolutions.length)) {
		const error = { message: "Incorrect value of available resolutions", field: "availableResolutions"};
		errorsMessages.push(error);
	}
	
	if (errorsMessages.length) {
		res.status(400).send({errorsMessages});
	} else {
		const newVideo = {
			id: Date.now(),
			canBeDownloaded: false,
			minAgeRestriction: null,
			createdAt: "2022-08-20T14:00:11.641Z",
			publicationDate: "2022-08-21T14:00:11.641Z",
			title,
			author,
			availableResolutions
		};
		
		videos.push(newVideo);
		res.status(201).send(newVideo);
	}
});

videosRouter.put("/:id", (req: Request, res: Response) => {
	const expectedVideo = videos.find(video => video.id === +req.params.id);
	
	if (!req.params.id || !expectedVideo) {
		res.send(404);
		return;
	}
	
	const errorsMessages = [];
	const minAgeRestriction = req.body.minAgeRestriction;
	const {title, author, publicationDate, availableResolutions, canBeDownloaded } = req.body;
	
	if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
		const error = { message: "Entered title is not correct!", field: "title"};
		errorsMessages.push(error);
	}
	if (!author || typeof author !== "string" || !author.trim() || author.length > 20) {
		const error = { message: "Entered author value is not correct!", field: "author"};
		errorsMessages.push(error);
	}
	if (availableResolutions && (!Array.isArray(availableResolutions) || !availableResolutions.length )) {
		const error = { message: "Incorrect value of available resolutions", field: "availableResolutions"};
		errorsMessages.push(error);
	}
	if (typeof publicationDate !== "string") {
		const error = { message: "Incorrect type of Date", field: "publicationDate"};
		errorsMessages.push(error);
	}
	if (typeof canBeDownloaded !== "boolean") {
		const error = { message: "Incorrect type of canBeDownloaded field", field: "canBeDownloaded"};
		errorsMessages.push(error);
	}
	if (minAgeRestriction && (Number(minAgeRestriction) > 18 || Number(minAgeRestriction) < 1)) {
		const error = { message: "Entered age is not correct", field: "minAgeRestriction"};
		errorsMessages.push(error);
	}
	
	if (errorsMessages.length) {
		res.status(400).send({errorsMessages});
	} else {
		videos = videos.map(item => {
			if (item.id === +req.params.id) {
				return {
					...item,
					publicationDate,
					canBeDownloaded,
					minAgeRestriction,
					title,
					author,
					availableResolutions
				};
			}
			
			return item;
		});
		res.send(204);
	}
});

