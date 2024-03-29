import {ObjectId} from "mongodb";
import {DbDeviceSession} from "../interfaces/devices-sessions-interfaces";
import {BlogOutputModel} from "../../../api/models/blogs/output-models";
import {PostOutputModel} from "../../../api/models/posts/output-models";
import {UserOutputModel} from "../../../api/models/users/output-models";
import {CommentOutputModel} from "../../../api/models/comments/output-models";
import {DeviceSessionOutputModel} from "../../../api/models/devices-sessions/output-models";
import {IBlog} from "../../../domain/blogs/BlogTypes";
import {IPost} from "../../../domain/posts/PostTypes";
import {IUser} from "../../../domain/users/UserTypes";
import {IComment} from "../../../domain/comments/CommentTypes";
import {ILike} from "../../../domain/likes/LikeTypes";
import {LikeInfoOutputModel} from "../../../api/models/likes/output-models";

export const getFilterByDbId = (id: string): {_id: ObjectId} => ({_id: new ObjectId(id)});

export const mapDbBlogToBlogOutputModel = (blog: IBlog): BlogOutputModel => {
	return {
		id: String(blog._id),
		name: blog.name,
		websiteUrl: blog.websiteUrl,
		description: blog.description,
		createdAt: blog.createdAt.toISOString()
	};
};

export const mapDbPostToPostOutputModel = (post: IPost): PostOutputModel => {
	return {
		id: String(post._id),
		title: post.title,
		shortDescription: post.shortDescription,
		content: post.content,
		blogId: String(post.blogId),
		blogName: post.blogName,
		createdAt: post.createdAt.toISOString()
	};
};

export const mapDbUserToUserOutputModel = (user: IUser): UserOutputModel => {
	return {
		id: String(user._id),
		login: user.login,
		email: user.email,
		createdAt: user.createdAt.toISOString()
	};
};

export const mapDbCommentToCommentOutputModel = (comment: IComment): CommentOutputModel => {
	return {
		id: String(comment._id),
		content: comment.content,
		userId: String(comment.userId),
		userLogin: comment.userLogin,
		createdAt: comment.createdAt.toISOString(),
	};
};

export const mapDbDeviceSessionToDeviceSessionOutputModel = (
	deviceSession: DbDeviceSession
): DeviceSessionOutputModel => {
 return {
	 ip: deviceSession.ip,
	 title: deviceSession.deviceName,
	 lastActiveDate: deviceSession.issuedAt ? new Date(deviceSession.issuedAt).toISOString() : "No lastActiveDate",
	 deviceId: deviceSession.deviceId || ""
 };
};

export const mapDbLikeToLikeInfoOutputModel = (
	like: ILike
): LikeInfoOutputModel => {
	return {
		userId: String(like.userId),
		login: like.userLogin,
		addedAt: like.createdAt.toISOString()
	};
}