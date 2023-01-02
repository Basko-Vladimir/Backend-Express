import {blogsRepository} from "../repositories/blogs/blogs-repository";
import {Blog} from "../classes/blogs";
import {CreateBlogInputModel, CreateBlogPostInputModel, UpdateBlogInputModel} from "../models/blogs/input-models";
import {NotFoundError} from "../classes/errors";
import {postsService} from "./posts-service";
import {PostOutputModel} from "../models/posts/output-models";

export const blogsService = {
	async getBlogById(id: string): Promise<Blog | null> {
		return blogsRepository.getBlogById(id);
	},
	
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
	
	async createPostByBlogId(blogId: string, createPostData: CreateBlogPostInputModel): Promise<string> {
		const blog = await blogsRepository.getBlogById(blogId);
		
		if (!blog) throw new NotFoundError();
		
		const { title, content, shortDescription } = createPostData;
		const postData: Omit<PostOutputModel, "id" | "createdAt"> = {
			blogId,
			title,
			content,
			shortDescription,
			blogName: blog.name
		};
		
		return postsService.createPost(postData);
	},
	
	async deleteAllBlogs(): Promise<void> {
		return blogsRepository.deleteAllBlogs();
	},
};
