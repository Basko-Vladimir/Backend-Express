import {injectable} from "inversify";
import {LikesInfoOutputModel} from "../../../api/models/likes/output-models";
import {LikeStatus} from "../../../common/enums";
import { LikeModel } from "../../../domain/likes/LikeTypes";

@injectable()
export class QueryLikesRepository {
	async getLikesInfo (userId: string | null, commentId: string): Promise<LikesInfoOutputModel> {
		const likesCount = await LikeModel
			.countDocuments({commentId, status: LikeStatus.LIKE});
		const dislikesCount = await LikeModel
			.countDocuments({commentId, status: LikeStatus.DISLIKE});
		let likeStatus = LikeStatus.NONE;

		if (userId) {
			const like = await LikeModel.findOne({userId, commentId});
			likeStatus = like ? like.status : likeStatus;
		}
		
		return {
			likesCount,
			dislikesCount,
			likeStatus
		}
	}
}
