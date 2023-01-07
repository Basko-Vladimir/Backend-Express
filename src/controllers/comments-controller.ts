import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus} from "./utils";
import {TypedRequestParams} from "../common/interfaces";
import {ParamIdInputModel} from "../models/common-models";
import {CommentOutputModel} from "../models/comments/output-models";
import {QueryCommentsRepository} from "../repositories/comments/query-comments-repository";
import {
	CreateCommentInputModel,
	ParamCommentIdInputModel,
	UpdateLikeStatusInputModel
} from "../models/comments/input-models";
import {CommentsService} from "../services/comments-service";
import {LikeStatus} from "../common/enums";

@injectable()
export class CommentsController {
	constructor(
		@inject(CommentsService) protected commentsService: CommentsService,
		@inject(QueryCommentsRepository) protected queryCommentsRepository: QueryCommentsRepository
	) {}
	
	async getCommentById(req: TypedRequestParams<ParamIdInputModel>, res: Response<CommentOutputModel>) {
		try {
			const comment = await this.queryCommentsRepository.getCommentById(req.params.id);
			res.status(200).send({
				...comment,
				likesInfo: {
					...comment.likesInfo,
					myStatus: LikeStatus.NONE
				}
			});
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
			await this.commentsService.updateLikeStatus(req.params.commentId, req.body.likeStatus);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}