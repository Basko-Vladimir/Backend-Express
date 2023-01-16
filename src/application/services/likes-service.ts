import {ObjectId} from "mongodb";
import {inject, injectable} from "inversify";
import {Like} from "../../domain/entities/likes";
import { LikesRepository } from "../../infrastructure/repositories/likes/likes-repository";
import { DbLike } from "../../infrastructure/repositories/interfaces/likes-interfaces";
import {UpdateOrFilterModel} from "../../common/interfaces";
import {LikeStatus} from "../../common/enums";

@injectable()
export class LikesService {
	constructor(
		@inject(LikesRepository) protected likesRepository: LikesRepository
	) {}
	async getLikeByFilter(filter: UpdateOrFilterModel): Promise<DbLike | null> {
		return this.likesRepository.getLikeByFilter(filter);
	}
	
	async createLike(userId: string, commentId: string, status?: LikeStatus): Promise<string> {
		const like = new Like(new ObjectId(userId), new ObjectId(commentId), status);
		
		return this.likesRepository.createLike(like);
	}
	
	async updateLike (likeId: string, status: LikeStatus): Promise<void> {
		return this.likesRepository.updateLike(likeId, status);
	}
	
	async deleteAllLikes(): Promise<void> {
		return this.likesRepository.deleteAllLikes();
	}
}
