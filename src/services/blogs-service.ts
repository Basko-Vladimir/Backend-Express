import {blogsRepository} from "../repositories/blogs/blogs-repository";
import {Blog} from "../classes/blogs";
import {CreateBlogInputModel, UpdateBlogInputModel} from "../models/blogs/input-models";

export const blogsService = {
	async createBlog(data: CreateBlogInputModel): Promise<string> {
		const { name, youtubeUrl } = data;
		const blogData = new Blog(name, youtubeUrl);

		return blogsRepository.createBlog(blogData);
	},
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		return blogsRepository.updateBlog(id, data);
	},
	
	async deleteBlog(id: string): Promise<void> {
		return blogsRepository.deleteBlog(id);
	},
	
	async deleteAllBlogs(): Promise<void> {
		return blogsRepository.deleteAllBlogs();
	},
	
	// async createPostByBlogId(blogId: string, postData: Omit<CreatePostModel, "blogId">): Promise<PostViewModel> {
	// 	return await postsService.createPost({...postData, blogId});
	// },
	//
	// async getAllPostsByBlogId(queryParams: OutputPostQueriesParams, blogId: string): Promise<PostViewModel[]> {
	// 	return postsService.getPosts(queryParams, blogId);
	// }
};
