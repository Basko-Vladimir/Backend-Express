import {inject, injectable} from "inversify";
import {BlogsRepository} from "../repositories/blogs/blogs-repository";
import {Blog} from "../classes/blogs";
import {CreateBlogInputModel, CreateBlogPostInputModel, UpdateBlogInputModel} from "../models/blogs/input-models";
import {NotFoundError} from "../classes/errors";
import {PostsService} from "./posts-service";
import {PostOutputModel} from "../models/posts/output-models";

@injectable()
export class BlogsService {
	constructor (
		@inject(BlogsRepository) protected blogsRepository: BlogsRepository,
		@inject(PostsService) protected postsService: PostsService
	) {}
	
	async getBlogById(id: string): Promise<Blog | null> {
		return this.blogsRepository.getBlogById(id);
	}
	
	async createBlog(data: CreateBlogInputModel): Promise<string> {
		const { name, websiteUrl, description } = data;
		const blogData = new Blog(name, websiteUrl, description);

		return this.blogsRepository.createBlog(blogData);
	}
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		return this.blogsRepository.updateBlog(id, data);
	}
	
	async deleteBlog(id: string): Promise<void> {
		return this.blogsRepository.deleteBlog(id);
	}
	
	async createPostByBlogId(blogId: string, createPostData: CreateBlogPostInputModel): Promise<string> {
		const blog = await this.blogsRepository.getBlogById(blogId);
		
		if (!blog) throw new NotFoundError();
		
		const { title, content, shortDescription } = createPostData;
		const postData: Omit<PostOutputModel, "id" | "createdAt"> = {
			blogId,
			title,
			content,
			shortDescription,
			blogName: blog.name
		};
		
		return this.postsService.createPost(postData);
	}
	
	async deleteAllBlogs(): Promise<void> {
		return this.blogsRepository.deleteAllBlogs();
	}
}
