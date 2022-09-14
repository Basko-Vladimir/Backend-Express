import { body } from "express-validator";
import {blogsService} from "../../services/blogs-service";

export const checkPostRequestBody = [
	body("title")
		.exists().withMessage("You didn't provide 'title' field")
		.trim().isLength({min: 1, max: 30}).withMessage("Name should be from 1 to 30 chars"),
	body("shortDescription")
		.exists().withMessage("You didn't provide 'shortDescription' field")
		.trim().isLength({min: 1, max: 100}).withMessage("Name should be from 1 to 100 chars"),
	body("content")
		.exists().withMessage("You didn't provide 'content' field")
		.trim().isLength({min: 1, max: 1000}).withMessage("Name should be from 1 to 1000 chars"),
	body("blogId")
		.exists().withMessage("You didn't provide 'blogId' field")
		.custom(async (value) => {
			const blog = await blogsService.getBlogById(value);
			
			if (!blog) throw new Error(`Blog with id "${value}" does not exist`);
			
			return value;
		})
];
