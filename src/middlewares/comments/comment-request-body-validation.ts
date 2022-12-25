import {body} from "express-validator";
import {generateLengthRangeErrorMessage, generateMissedPropError } from "../../common/error-messages";
import {commentsConstants} from "../../common/constants";

const { MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH } = commentsConstants;
export const commentRequestBodyValidation = body("content")
	.exists()
	.withMessage(generateMissedPropError("content"))
	.trim()
	.isLength({min: MIN_CONTENT_LENGTH, max: MAX_CONTENT_LENGTH})
	.withMessage(generateLengthRangeErrorMessage("content", MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH));
