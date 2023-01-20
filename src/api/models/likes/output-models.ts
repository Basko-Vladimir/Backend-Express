import {LikeStatus} from "../../../common/enums";

export interface LikeInfoOutputModel {
	addedAt: string;
	userId: string;
	login: string
}

export interface LikesInfoOutputModel {
	likesCount: number;
	dislikesCount: number;
	myStatus: LikeStatus
}

export interface ExtendedLikesInfoOutputModel extends LikesInfoOutputModel {
	newestLikes: LikeInfoOutputModel[];
}
