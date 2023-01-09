import {injectable} from "inversify";
import {LikesModel} from "../db";
import {LikesInfoOutputModel} from "../../models/likes/output-models";
import {LikeStatus} from "../../common/enums";

@injectable()
export class QueryLikesRepository {
	async getLikesInfo (userId: string, commentId: string): Promise<LikesInfoOutputModel> {
		const likesCount = await LikesModel
			.countDocuments({commentId, status: LikeStatus.LIKE});
		const dislikesCount = await LikesModel
			.countDocuments({commentId, status: LikeStatus.DISLIKE});
		const currentUserLike = await LikesModel
			.findOne({userId, commentId});
		
		return {
			likesCount,
			dislikesCount,
			likeStatus: currentUserLike ? currentUserLike.status : LikeStatus.NONE
		}
	}
}
