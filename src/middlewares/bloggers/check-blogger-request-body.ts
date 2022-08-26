import { body } from "express-validator";

export const checkBloggerRequestBody = [
	body("name")
		.exists().bail().withMessage("You didn't provide 'name' field")
		.isLength({max: 15}).withMessage("Name should be less than 15 chars"),
	body("youtubeUrl")
		.exists().bail().withMessage("You didn't provide 'youtubeUrl' field")
		.isURL().bail().withMessage("URL doesn't match to pattern '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'",)
		.isLength({max: 100}).withMessage("Name should be less than 100 chars")
];
