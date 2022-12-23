import {body} from "express-validator";
import {blogsConstants, MIN_STRINGS_LENGTH} from "../../common/constants";

const { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_WEBSITE_URL_LENGTH, WEBSITE_URL_REG_EXP } = blogsConstants;
export const blogRequestBodyValidation = [
	body("name")
		.exists()
		.withMessage("You didn't provide 'name' field")
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_NAME_LENGTH})
		.withMessage(`Name should be from ${MIN_STRINGS_LENGTH} to ${MAX_NAME_LENGTH} chars`),
	body("websiteUrl")
		.exists()
		.withMessage("You didn't provide 'websiteUrl' field")
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_WEBSITE_URL_LENGTH})
		.withMessage(`WebsiteUrl should be from ${MIN_STRINGS_LENGTH} to ${MAX_WEBSITE_URL_LENGTH} chars`)
		.isURL()
		.withMessage(`URL doesn't match to pattern ${WEBSITE_URL_REG_EXP}`),
	body("description")
		.exists()
		.withMessage("You didn't provide 'description' field")
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_DESCRIPTION_LENGTH})
		.withMessage(`Description should be from ${MIN_STRINGS_LENGTH} to ${MAX_DESCRIPTION_LENGTH} chars`)
];
