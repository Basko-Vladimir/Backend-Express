import {injectable} from "inversify";
import {getFilterByDbId} from "../utils/mappers-utils";
import {DbLike} from "../interfaces/likes-interfaces";
import {LikesModel} from "../../db";
import {Like} from "../../../domain/entities/likes";
import {LikeStatus} from "../../../common/enums";
import {UpdateOrFilterModel} from "../../../common/interfaces";
import {DataBaseError} from "../../../common/errors/errors-types";

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
	
	async deleteAllLikes(): Promise<void> {
		await LikesModel.deleteMany({});
	}
}
