import { body } from "express-validator";
import { MIN_STRINGS_LENGTH, postsConstants } from "../../common/constants";

const { MAX_CONTENT_LENGTH, MAX_SHORT_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } = postsConstants;
export const postBodyCommonFieldsValidation = [
	body("title")
		.exists()
		.withMessage("You didn't provide 'title' field")
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_TITLE_LENGTH})
		.withMessage(`Name should be from ${MIN_STRINGS_LENGTH} to ${MAX_TITLE_LENGTH} chars`),
	body("shortDescription")
		.exists()
		.withMessage("You didn't provide 'shortDescription' field")
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_SHORT_DESCRIPTION_LENGTH})
		.withMessage(`Name should be from ${MIN_STRINGS_LENGTH} to ${MAX_SHORT_DESCRIPTION_LENGTH} chars`),
	body("content")
		.exists()
		.withMessage("You didn't provide 'content' field")
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_CONTENT_LENGTH})
		.withMessage(`Name should be from ${MIN_STRINGS_LENGTH} to ${MAX_CONTENT_LENGTH} chars`)
];
