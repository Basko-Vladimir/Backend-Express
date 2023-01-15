import { body } from "express-validator";
import { MIN_STRINGS_LENGTH, postsConstants } from "../../../common/constants";
import {generateLengthRangeErrorMessage, generateMissedPropError} from "../../../common/errors/error-messages";

const { MAX_CONTENT_LENGTH, MAX_SHORT_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } = postsConstants;
export const postBodyCommonFieldsValidation = [
	body("title")
		.exists()
		.withMessage(generateMissedPropError("title"))
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_TITLE_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("title", MIN_STRINGS_LENGTH, MAX_TITLE_LENGTH)),
	body("shortDescription")
		.exists()
		.withMessage(generateMissedPropError("shortDescription"))
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_SHORT_DESCRIPTION_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("shortDescription", MIN_STRINGS_LENGTH, MAX_SHORT_DESCRIPTION_LENGTH)),
	body("content")
		.exists()
		.withMessage(generateMissedPropError("content"))
		.trim()
		.isLength({min: MIN_STRINGS_LENGTH, max: MAX_CONTENT_LENGTH})
		.withMessage(generateLengthRangeErrorMessage("content", MIN_STRINGS_LENGTH, MAX_CONTENT_LENGTH))
];
