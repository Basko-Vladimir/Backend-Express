import {inject, injectable} from "inversify";
import {LikesRepository} from "../../infrastructure/repositories/likes/likes-repository";
import {UpdateOrFilterModel} from "../../common/interfaces";
import {LikeStatus} from "../../common/enums";
import {ILike, LikeModel} from "../../domain/likes/LikeTypes";
import {NotFoundError} from "../../common/errors/errors-types";

@injectable()
export class LikesService {
	constructor(
		@inject(LikesRepository) protected likesRepository: LikesRepository
	) {}
	async getLikeByFilter(filter: UpdateOrFilterModel): Promise<ILike | null> {
		return this.likesRepository.getLikeByFilter(filter);
	}
	
	async createLike(
		userId: string,
		commentId: string,
		status: LikeStatus = LikeStatus.NONE
	): Promise<string> {
		const createdLike = LikeModel.createLikeEntity(userId, commentId, status);
		const savedLike = await this.likesRepository.save(createdLike);
		
		return String(savedLike._id);
	}
	
	async updateLike (likeId: string, status: LikeStatus): Promise<void> {
		const targetLike = await this.getLikeByFilter({_id: likeId});
		
		if (!targetLike) throw new NotFoundError();
		
		const updatedLike = targetLike?.updateLikeStatus(status);
		await this.likesRepository.save(updatedLike);
	}
	
	async deleteAllLikes(): Promise<void> {
		return this.likesRepository.deleteAllLikes();
	}
}
