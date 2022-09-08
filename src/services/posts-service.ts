// import { Post } from "../classes/posts";
// import {CreatePostModel, PostViewModel, UpdatePostModel} from "../models/post-models";
// import { postsRepository } from "../repositories/posts-repository";
// import {mapObjectIdToId} from "../utils/id-utils";
// import {OutputPostQueriesParams} from "../interfaces/posts-interfaces";
// import {ObjectId} from "mongodb";
// import {countSkipValue, setSortValue} from "../utils/query-params-utils";
// import {blogsService} from "./blogs-service";
//
// export const postsService = {
// 	async getPosts(
// 		queryParams: OutputPostQueriesParams,
// 		blogId?: string
// 	): Promise<PostViewModel[]> {
// 		const { sortBy, sortDirection, pageNumber, pageSize } = queryParams;
// 		const transformedBlogId = blogId ? new ObjectId(blogId) : null;
// 		const skip = countSkipValue(pageNumber, pageSize);
// 		const sortSetting = setSortValue(sortBy, sortDirection);
// 		const posts = await postsRepository.getPosts(skip, pageSize, sortSetting, transformedBlogId);
//
// 		return posts.map(mapObjectIdToId<PostViewModel>);
// 	},
//
// 	async getPostById(id: string): Promise<PostViewModel> {
// 		const post = await postsRepository.getPostById(new ObjectId(id));
// 		return mapObjectIdToId(post);
// 	},
//
// 	async createPost(
// 		postData: CreatePostModel,
// 	): Promise<PostViewModel> {
// 		const { title, content, shortDescription, blogId } = postData;
// 		const { name: blogName } = await blogsService.getBlogById(blogId);
// 		const newPostData = new Post({
// 			title,
// 			content,
// 			shortDescription,
// 			blogName,
// 			blogId: new ObjectId(blogId)
// 		});
//
// 		const createdPost = await postsRepository.createPost(newPostData);
//
// 		return mapObjectIdToId(createdPost);
// 	},
//
// 	async updatePost(id: string, postData: UpdatePostModel): Promise<void> {
// 		return postsRepository.updatePost(new ObjectId(id), postData);
// 	},
//
// 	async deletePost(id: string): Promise<void> {
// 		return postsRepository.deletePost(new ObjectId(id));
// 	},
//
// 	async deleteAllPosts(): Promise<void> {
// 		return postsRepository.deleteAllPosts();
// 	}
// };
