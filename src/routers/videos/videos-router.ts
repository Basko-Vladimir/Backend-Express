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

export let videos: IVideo[] = [
	// {
	// 	id: 1,
	// 	title: "Lesson - 01",
	// 	author: "Ivan Petrov",
	// 	canBeDownloaded: true,
	// 	minAgeRestriction: 12,
	// 	createdAt: "2022-08-19T14:00:11.641Z",
	// 	publicationDate: "2022-08-19T14:00:11.641Z",
	// 	availableResolutions: [resolutions.P240, resolutions.P144, resolutions.P1080]
	// },
	// {
	// 	id: 2,
	// 	title: "Lesson - 02",
	// 	author: "Sergey Gorovoy",
	// 	canBeDownloaded: true,
	// 	minAgeRestriction: 18,
	// 	createdAt: "2022-08-15T14:00:11.641Z",
	// 	publicationDate: "2022-08-17T14:00:11.641Z",
	// 	availableResolutions: [resolutions.P720, resolutions.P1080]
	// },
	// {
	// 	id: 3,
	// 	title: "Lesson - 03",
	// 	author: "Anrew Kislyak",
	// 	canBeDownloaded: true,
	// 	minAgeRestriction: 0,
	// 	createdAt: "2022-07-12T14:00:11.641Z",
	// 	publicationDate: "2022-07-14T14:00:11.641Z",
	// 	availableResolutions: [resolutions.P144, resolutions.P480, resolutions.P1440]
	// }
];

export const clearVideos = () => videos = [];

export const videosRouter = Router({});

videosRouter.get("/", (req: Request, res: Response) => {
	res.status(200).send(videos);
});

videosRouter.get("/:id", (req: Request, res: Response) => {
	const expectedVideo = videos.find(video => video.id === +req.params.id);
	
	!expectedVideo || !req.params.id
		? res.send(404)
		: res.status(200).send(expectedVideo);
});

videosRouter.delete("/:id", (req: Request, res: Response) => {
	const expectedVideoId = videos.findIndex(video => video.id === +req.params.id);
	const statusCode = expectedVideoId === -1 || !req.params.id ? 404 : 204;
	
	res.send(statusCode);
});

videosRouter.post("/", (req: Request, res: Response) => {
	const errorMessages = [];
	const title = req.body.title.trim();
	const author = req.body.author.trim();
	const availableResolutions = req.body.availableResolutions;
	
	if (!title || typeof title !== "string" || title.length > 40) {
		const error = { message: "Entered title is not correct!", field: "title"};
		errorMessages.push(error);
	}
	if (!author || typeof author !== "string" || author.length > 20) {
		const error = { message: "Entered author value is not correct!", field: "author"};
		errorMessages.push(error);
	}
	if (availableResolutions && (!Array.isArray(availableResolutions) || !availableResolutions.length )) {
		const error = { message: "Incorrect value of available resolutions", field: "availableResolutions"};
		errorMessages.push(error);
	}
	
	if (errorMessages.length) {
		res.status(400).send(errorMessages);
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
	
	if (!expectedVideo || !req.params.id) {
		res.status(404);
		return;
	}
	
	const errorMessages = [];
	const title = req.body.title.trim();
	const author = req.body.author.trim();
	const publicationDate = req.body.publicationDate.trim();
	const minAgeRestriction = +req.body.minAgeRestriction;
	const { availableResolutions, canBeDownloaded }  = req.body;
	
	if (!title || typeof title !== "string" || title.length > 40) {
		const error = { message: "Entered title is not correct!", field: "title"};
		errorMessages.push(error);
	}
	if (!author || typeof author !== "string" || author.length > 20) {
		const error = { message: "Entered author value is not correct!", field: "author"};
		errorMessages.push(error);
	}
	if (availableResolutions && (!Array.isArray(availableResolutions) || !availableResolutions.length )) {
		const error = { message: "Incorrect value of available resolutions", field: "availableResolutions"};
		errorMessages.push(error);
	}
	if (typeof publicationDate !== "string") {
		const error = { message: "Incorrect type of Date", field: "publicationDate"};
		errorMessages.push(error);
	}
	if (typeof canBeDownloaded !== "boolean") {
		const error = { message: "Incorrect type of canBeDownloaded field", field: "canBeDownloaded"};
		errorMessages.push(error);
	}
	if (isNaN(minAgeRestriction) || minAgeRestriction > 18 || minAgeRestriction < 1) {
		const error = { message: "Entered age is not correct", field: "minAgeRestriction"};
		errorMessages.push(error);
	}
	
	if (errorMessages.length) {
		res.status(400).send(errorMessages);
	} else {
		const newVideo = {
			id: +req.params.id,
			createdAt: "2022-08-19T14:00:11.641Z",
			publicationDate,
			canBeDownloaded,
			minAgeRestriction,
			title,
			author,
			availableResolutions
		};
		
		videos.forEach((item, index) => {
			if (item.id === newVideo.id) {
				videos.splice(index, 1, newVideo);
			}
		});
		res.status(204);
	}
});

