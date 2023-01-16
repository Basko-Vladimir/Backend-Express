import {inject, injectable} from "inversify";
import {BlogsRepository} from "../../infrastructure/repositories/blogs/blogs-repository";
import {CreateBlogInputModel, CreateBlogPostInputModel, UpdateBlogInputModel} from "../../api/models/blogs/input-models";
import {PostsService} from "./posts-service";
import {PostOutputModel} from "../../api/models/posts/output-models";
import { NotFoundError } from "../../common/errors/errors-types";
import {BlogModel, IBlog} from "../../domain/blogs/BlogTypes";

@injectable()
export class BlogsService {
	constructor (
		@inject(BlogsRepository) protected blogsRepository: BlogsRepository,
		@inject(PostsService) protected postsService: PostsService
	) {}
	
	async getBlogById(id: string): Promise<IBlog | null> {
		return this.blogsRepository.getBlogById(id);
	}
	
	async createBlog(data: CreateBlogInputModel): Promise<string> {
		const { name, websiteUrl, description } = data;
		const newEntity = await BlogModel.createEntity(name, websiteUrl, description);
		
		const createdBlog = await this.blogsRepository.save(newEntity);

		return String(createdBlog._id);
	}
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		const targetBlog = await this.getBlogById(id);
		
		if (targetBlog) {
			const updatedBlog = await targetBlog.updateData(data);
			await this.blogsRepository.save(updatedBlog);
		}
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
