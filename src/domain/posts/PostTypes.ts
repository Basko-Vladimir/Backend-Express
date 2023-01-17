import {HydratedDocument, Model, model} from "mongoose";
import {ObjectId} from "mongodb";
import {postSchema} from "./PostSchema";
import {UpdatePostInputModel} from "../../api/models/posts/input-models";

export interface IPostProps {
	title: string;
	shortDescription: string;
	content: string;
	blogId: ObjectId;
	blogName: string;
	createdAt: Date;
}

export interface IPostMethods {
	updatePostData(data: UpdatePostInputModel): IPost;
}

export interface IPost extends HydratedDocument<IPostProps, IPostMethods> {}

export interface IPostModel extends Model<IPostProps, {}, IPostMethods> {

}

export const PostModel = model<IPostProps, IPostModel>("Post", postSchema);
