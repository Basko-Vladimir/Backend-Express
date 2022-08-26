import { body } from "express-validator";
import {bloggersRepository} from "../../repositories/bloggers-repository";

export const checkPostRequestBody = [
	body("title")
		.exists().bail().withMessage("You didn't provide 'title' field")
		.isLength({max: 30}).withMessage("Name should be less than 30 chars"),
	body("shortDescription")
		.exists().bail().withMessage("You didn't provide 'shortDescription' field")
		.isLength({max: 100}).withMessage("Name should be less than 100 chars"),
	body("content")
		.exists().bail().withMessage("You didn't provide 'content' field")
		.isLength({max: 1000}).withMessage("Name should be less than 1000 chars"),
	body("bloggerId")
		.exists().bail().withMessage("You didn't provide 'bloggerId' field")
		.custom(value => {
			 if (!bloggersRepository.getBloggerById(value)) {
				 throw new Error(`Blogger with id "${value}" does not exist`);
			 }
			 return value;
		})
];
