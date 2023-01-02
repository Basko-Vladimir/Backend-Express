import {body} from "express-validator";

export const commentRequestBodyValidation = body("content")
	.exists().withMessage("You didn't provide 'content' field")
	.trim().isLength({min: 20, max: 300}).withMessage("Content should be from 20 to 300 chars");
