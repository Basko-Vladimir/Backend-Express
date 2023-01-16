import {injectable} from "inversify";
import {LikesModel} from "../../db";
import {LikesInfoOutputModel} from "../../../api/models/likes/output-models";
import {LikeStatus} from "../../../common/enums";

@injectable()
export class QueryLikesRepository {
	async getLikesInfo (userId: string | null, commentId: string): Promise<LikesInfoOutputModel> {
		const likesCount = await LikesModel
			.countDocuments({commentId, status: LikeStatus.LIKE});
		const dislikesCount = await LikesModel
			.countDocuments({commentId, status: LikeStatus.DISLIKE});
		let likeStatus = LikeStatus.NONE;

		if (userId) {
			const like = await LikesModel.findOne({userId, commentId});
			likeStatus = like ? like.status : likeStatus;
		}
		
		return {
			likesCount,
			dislikesCount,
			likeStatus
		}
	}
}
