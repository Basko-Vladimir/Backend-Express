import {body} from "express-validator";
import {blogsConstants, MIN_STRINGS_LENGTH} from "../../common/constants";
import {
	generateLengthRangeErrorMessage,
	generateMissedPropError,
	generateRegExpError
} from "../../common/error-messages";

const { MAX_NAME_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_WEBSITE_URL_LENGTH, WEBSITE_URL_REG_EXP } = blogsConstants;
export const blogRequestBodyValidation = [
	body("name")
		.exists()
		.withMessage(generateMissedPropError("name"))
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_NAME_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("name", MIN_STRINGS_LENGTH, MAX_NAME_LENGTH)),
	body("websiteUrl")
		.exists()
		.withMessage(generateMissedPropError("websiteUrl"))
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_WEBSITE_URL_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("websiteUrl", MIN_STRINGS_LENGTH, MAX_WEBSITE_URL_LENGTH))
		.isURL()
		.withMessage(generateRegExpError("websiteUrl", WEBSITE_URL_REG_EXP)),
	body("description")
		.exists()
		.withMessage(generateMissedPropError("description"))
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_DESCRIPTION_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("description", MIN_STRINGS_LENGTH, MAX_DESCRIPTION_LENGTH))
];
