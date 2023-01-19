import {injectable} from "inversify";
import {getFilterByDbId} from "../utils/mappers-utils";
import {LikeStatus} from "../../../common/enums";
import {UpdateOrFilterModel} from "../../../common/interfaces";
import {DataBaseError} from "../../../common/errors/errors-types";
import {ILike, LikeModel} from "../../../domain/likes/LikeTypes";

@injectable()
export class LikesRepository {
	async getLikeByFilter(filter: UpdateOrFilterModel): Promise<ILike | null> {
		return LikeModel.findOne(filter);
	}
	
	async save(like: ILike): Promise<ILike> {
		return like.save();
	}
	
	async updateLike(likeId: string, status: LikeStatus): Promise<void> {
		const {matchedCount} = await LikeModel.updateOne(
			getFilterByDbId(likeId),
			{status}
		);
		
		if (!matchedCount) throw new DataBaseError();
	}
	
	async deleteAllLikes(): Promise<void> {
		await LikeModel.deleteMany({});
	}
}
