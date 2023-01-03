import {PostSortByField} from "../../common/enums";
import {AllEntitiesOutputModel, CommonQueryParamsModel} from "../common-models";
import {CommentOutputModel} from "../comments/output-models";

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

export interface PostsQueryParamsOutputModel extends CommonQueryParamsModel<PostSortByField> {}
