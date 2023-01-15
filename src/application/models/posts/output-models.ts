import {PostSortByField} from "../../../common/enums";
import {AllEntitiesOutputModel, CommonQueryParamsModel} from "../common-models";
import {CommentOutputModel, FullCommentOutputModel} from "../comments/output-models";

export interface PostOutputModel {
	id: string;
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
	createdAt: string;
}

export type PostAllCommentsOutputModel = AllEntitiesOutputModel<CommentOutputModel>;
export type PostAllFullCommentsOutputModel = AllEntitiesOutputModel<FullCommentOutputModel>;

export interface PostsQueryParamsOutputModel extends CommonQueryParamsModel<PostSortByField> {}
