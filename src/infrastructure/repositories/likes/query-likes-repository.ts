import {injectable} from "inversify";
import {mapDbLikeToLikeInfoOutputModel} from "../utils/mappers-utils";
import {
	ExtendedLikesInfoOutputModel,
	LikesInfoOutputModel
} from "../../../api/models/likes/output-models";
import {LikeStatus} from "../../../common/enums";
import { LikeModel } from "../../../domain/likes/LikeTypes";

@injectable()
export class QueryLikesRepository {
	async getLikesInfo (userId: string | null, commentId: string): Promise<LikesInfoOutputModel> {
		const likesCount = await LikeModel
			.countDocuments({commentId, status: LikeStatus.LIKE});
		const dislikesCount = await LikeModel
			.countDocuments({commentId, status: LikeStatus.DISLIKE});
		let myStatus = LikeStatus.NONE;

		if (userId) {
			const like = await LikeModel.findOne({userId, commentId});
			myStatus = like ? like.status : myStatus;
		}
		
		return {
			likesCount,
			dislikesCount,
			myStatus
		}
	}
	
	async getExtendedLikesInfo(postId: string, userId: string | null): Promise<ExtendedLikesInfoOutputModel> {
		const likesCount = await LikeModel
			.countDocuments({postId, commentId: null, status: LikeStatus.LIKE});
		const dislikesCount = await LikeModel
			.countDocuments({postId, commentId: null, status: LikeStatus.DISLIKE});
		const newestLikes = await LikeModel
			.find({commentId: null, postId, status: LikeStatus.LIKE})
			.sort("-createdAt")
			.limit(3);
		let myStatus = LikeStatus.NONE;
		
		if (userId) {
			const like = await LikeModel.findOne({userId, commentId: null});
			myStatus = like ? like.status : myStatus;
		}
		
		return {
			likesCount,
			dislikesCount,
			myStatus,
			newestLikes: newestLikes.map(mapDbLikeToLikeInfoOutputModel)
		}
	}
}
