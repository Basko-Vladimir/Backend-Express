import { body } from "express-validator";
import {postBodyCommonFieldsValidation} from "./post-body-common-fields-validation";
import {iocContainer} from "../../../composition-root";
import { BlogsService } from "../../../application/services/blogs-service";
import {generateMissedPropError} from "../../../common/errors/error-messages";

const blogsService = iocContainer.resolve(BlogsService);

export const postRequestFullBodyValidation = [
	...postBodyCommonFieldsValidation,
	body("blogId")
		.exists().withMessage(generateMissedPropError("blogId"))
		.custom(async (value) => {
			const blog = await blogsService.getBlogById(value);
			
			if (!blog) throw new Error(`Blog with id "${value}" does not exist`);
			
			return value;
		})
];
