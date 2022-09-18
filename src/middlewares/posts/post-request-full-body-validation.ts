import { body } from "express-validator";
import {postBodyCommonFieldsValidation} from "./post-body-common-fields-validation";
import {blogsService} from "../../services/blogs-service";

export const postRequestFullBodyValidation = [
	...postBodyCommonFieldsValidation,
	body("blogId")
		.exists().withMessage("You didn't provide 'blogId' field")
		.custom(async (value) => {
			const blog = await blogsService.getBlogById(value);
			
			if (!blog) throw new Error(`Blog with id "${value}" does not exist`);
			
			return value;
		})
];
