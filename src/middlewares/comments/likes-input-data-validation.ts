import {body} from "express-validator";
import {generateMissedPropError} from "../../common/error-messages";
import {LikeStatus} from "../../common/enums";
import {makeCapitalizeString} from "../../common/utils";

export const likesInputDataValidation = body("likeStatus")
	.exists().withMessage(generateMissedPropError("likeStatus"))
	.customSanitizer(value => makeCapitalizeString(value))
	.custom(likeStatus => {
		const handledLikeStatus = makeCapitalizeString(likeStatus)
		
		const isCorrectLikeStatus = [
			LikeStatus.NONE === handledLikeStatus,
			LikeStatus.DISLIKE === handledLikeStatus,
			LikeStatus.LIKE === handledLikeStatus,
		].some(item => item);
		
		if (isCorrectLikeStatus) return handledLikeStatus;
		
		throw new Error("Incorrect value of enum field 'likeStatus'");
	});
