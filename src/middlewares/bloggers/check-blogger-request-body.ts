import { body } from "express-validator";

export const checkBloggerRequestBody = [
	body("name")
		.exists().withMessage("You didn't provide 'name' field")
		.trim().isLength({min: 1, max: 15}).withMessage("Name should be from 1 to 15 chars"),
	body("youtubeUrl")
		.exists().withMessage("You didn't provide 'youtubeUrl' field")
		.trim().isLength({min: 1, max: 100}).withMessage("Name should be from 1 to 100 chars")
		.isURL().withMessage("URL doesn't match to pattern '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'",)
];
