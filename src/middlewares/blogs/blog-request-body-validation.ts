import {body} from "express-validator";

export const blogRequestBodyValidation = [
	body("name")
		.exists().withMessage("You didn't provide 'name' field")
		.trim().isLength({min: 1, max: 15}).withMessage("Name should be from 1 to 15 chars"),
	body("websiteUrl")
		.exists().withMessage("You didn't provide 'websiteUrl' field")
		.trim().isLength({min: 1, max: 100}).withMessage("WebsiteUrl should be from 1 to 100 chars")
		.isURL().withMessage("URL doesn't match to pattern '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'"),
	body("description")
		.exists().withMessage("You didn't provide 'description' field")
		.trim().isLength({min: 1, max: 500}).withMessage("Description should be from 1 to 500 chars")
];
