import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {getErrorStatus, getFullCommentOutputModel} from "./utils";
import {TypedRequestParams} from "../../common/interfaces";
import {ParamIdInputModel} from "../models/common-models";
import {CommentOutputModel} from "../models/comments/output-models";
import {UpdateLikeStatusInputModel} from "../models/likes/input-models";
import { CreateCommentInputModel, ParamCommentIdInputModel } from "../models/comments/input-models";
import {QueryCommentsRepository} from "../../infrastructure/repositories/comments/query-comments-repository";
import {QueryLikesRepository} from "../../infrastructure/repositories/likes/query-likes-repository";
import {CommentsService} from "../../application/services/comments-service";
import {DevicesSessionsService} from "../../application/services/devices-sessions-service";
import {JwtService} from "../../application/services/jwt-service";
import {UsersService} from "../../application/services/users-service";

@injectable()
export class CommentsController {
	constructor(
		@inject(CommentsService) protected commentsService: CommentsService,
		@inject(QueryCommentsRepository) protected queryCommentsRepository: QueryCommentsRepository,
		@inject(DevicesSessionsService) protected  devicesSessionsService: DevicesSessionsService,
		@inject(QueryLikesRepository) protected  queryLikesRepository: QueryLikesRepository,
		@inject(JwtService) protected jwtService: JwtService,
		@inject(UsersService) protected usersService: UsersService,
	) {}
	
	async getCommentById(req: TypedRequestParams<ParamIdInputModel>, res: Response<CommentOutputModel>) {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			const tokenPayload = token && await this.jwtService.getTokenPayload(token);
			const user = tokenPayload && await this.usersService.getUserById(tokenPayload.userId);
			const userId = user ? String(user._id) : null;
			
			const comment = await this.queryCommentsRepository.getCommentById(req.params.id);
			const likesInfo = await this.queryLikesRepository.getLikesInfo(userId, comment.id);
			
			const fullCommentInfo = getFullCommentOutputModel(comment, likesInfo);

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
	
	async updateCommentLikeStatus (req: Request<ParamCommentIdInputModel, {}, UpdateLikeStatusInputModel>, res: Response<void>) {
		try {
			await this.commentsService.updateCommentLikeStatus(req.context.user!, req.params.commentId, req.body.likeStatus);
			res.sendStatus(204);
		} catch (err) {
			res.sendStatus(getErrorStatus(err));
		}
	}
}