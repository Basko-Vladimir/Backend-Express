export enum SortDirection {
	desc = "desc",
	asc = "asc"
}

export enum BlogSortByField {
	name = "name",
	websiteUrl = "websiteUrl",
	createdAt = "createdAt"
}

export enum PostSortByField {
	createdAt = "createdAt",
	title = "title",
	blogName = "blogName",
	shortDescription = "shortDescription",
	content = "content"
}

export enum UserSortByField {
	login = "login",
	email = "email",
	createdAt = "createdAt"
}

export enum CommentSortByField {
	content = "content",
	userLogin = "userLogin",
	createdAt = "createdAt"
}

export enum ClientRequestSortByField {
	endpoint = "endpoint",
	ip = "ip",
	createTimeStamp = "createTimeStamp"
}

export enum LikeStatus {
	NONE = "none",
	LIKE = "like",
	DISLIKE = "dislike"
}
