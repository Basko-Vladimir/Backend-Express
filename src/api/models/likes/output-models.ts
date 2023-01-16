import {LikeStatus} from "../../../common/enums";

export interface LikesInfoOutputModel {
	likesCount: number;
	dislikesCount: number;
	likeStatus: LikeStatus
}
