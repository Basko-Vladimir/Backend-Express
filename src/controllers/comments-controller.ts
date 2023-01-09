import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus, getFullCommentOutputModel} from "./utils";
import {TypedRequestParams} from "../common/interfaces";
import {LikeStatus} from "../common/enums";
import {ParamIdInputModel} from "../models/common-models";
import {CommentOutputModel} from "../models/comments/output-models";
import {UpdateLikeStatusInputModel} from "../models/likes/input-models";
import { CreateCommentInputModel, ParamCommentIdInputModel } from "../models/comments/input-models";
import {QueryCommentsRepository} from "../repositories/comments/query-comments-repository";
import {QueryLikesRepository} from "../repositories/likes/query-likes-repository";
import {CommentsService} from "../services/comments-service";
import {DevicesSessionsService} from "../services/devices-sessions-service";

@injectable()
export class CommentsController {
	constructor(
		@inject(CommentsService) protected commentsService: CommentsService,
		@inject(QueryCommentsRepository) protected queryCommentsRepository: QueryCommentsRepository,
		@inject(DevicesSessionsService) protected  devicesSessionsService: DevicesSessionsService,
		@inject(QueryLikesRepository) protected  queryLikesRepository: QueryLikesRepository
	) {}
	
	async getCommentById(req: TypedRequestParams<ParamIdInputModel>, res: Response<CommentOutputModel>) {
		try {
			const comment = await this.queryCommentsRepository.getCommentById(req.params.id);
			const likesInfo = await this.queryLikesRepository.getLikesInfo(comment.userId, comment.id);
			const fullCommentInfo = getFullCommentOutputModel(comment, likesInfo);
			const isAuthorized = await this.devicesSessionsService.getDeviceSessionByFilter({userId: comment.userId});
			
			if (!isAuthorized) {
				fullCommentInfo.likesInfo.myStatus = LikeStatus.NONE;
			}
			
			res.status(200).send(fullCommentInfo);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async deleteComment (req: TypedRequestParams<ParamCommentIdInputModel>, res: Response<void>) {
		try {
			await this.commentsService.deleteComment(req.params.commentId);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async updateComment (req: Request<ParamCommentIdInputModel, {}, CreateCommentInputModel>, res: Response<void>) {
		try {
			await this.commentsService.updateComment(req.params.commentId, req.body.content);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
	
	async updateLikeStatus (req: Request<ParamCommentIdInputModel, {}, UpdateLikeStatusInputModel>, res: Response<void>) {
		try {
			await this.commentsService.updateLikeStatus(String(req.context.user!._id), req.params.commentId, req.body.likeStatus);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}