import {body} from "express-validator";
import {generateMissedPropError} from "../../common/error-messages";
import {LikeStatus} from "../../common/enums";

export const likesInputDataValidation = body("likeStatus")
	.exists().withMessage(generateMissedPropError("likeStatus"))
	.toLowerCase()
	.custom(likeStatus => {
		const isCorrectLikeStatus = [
			LikeStatus.NONE === likeStatus,
			LikeStatus.DISLIKE === likeStatus,
			LikeStatus.LIKE === likeStatus,
		].some(item => item);
		
		if (isCorrectLikeStatus) return likeStatus;
		
		throw new Error("Incorrect value of enum field 'likeStatus'");
	});
