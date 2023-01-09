import {injectable} from "inversify";
import {LikesModel} from "../db";
import {Like} from "../../classes/likes";
import {DataBaseError} from "../../classes/errors";
import {LikeStatus} from "../../common/enums";
import {UpdateOrFilterModel} from "../../common/interfaces";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DbLike} from "../interfaces/likes-interfaces";

@injectable()
export class LikesRepository {
	async getLikeByFilter(filter: UpdateOrFilterModel): Promise<DbLike | null> {
		return LikesModel.findOne(filter);
	}
	
	async createLike (like: Like): Promise<string> {
		const createdLike = await LikesModel.create(like);
		
		if (!createdLike) throw new DataBaseError();
		
		return String(createdLike._id);
	}
	
	async updateLike (likeId: string, status: LikeStatus): Promise<void> {
		const { matchedCount } = await LikesModel.updateOne(
			getFilterByDbId(likeId),
			{status}
		);
		
		if (!matchedCount) throw new DataBaseError();
	}
}
