import {inject, injectable} from "inversify";
import {BlogsRepository} from "../../infrastructure/repositories/blogs/blogs-repository";
import {CreateBlogInputModel, CreateBlogPostInputModel, UpdateBlogInputModel} from "../../api/models/blogs/input-models";
import {BlogModel, IBlog} from "../../domain/blogs/BlogTypes";
import {NotFoundError} from "../../common/errors/errors-types";
import {PostsRepository} from "../../infrastructure/repositories/posts/posts-repository";

@injectable()
export class BlogsService {
	constructor (
		@inject(BlogsRepository) protected blogsRepository: BlogsRepository,
		@inject(PostsRepository) protected postsRepository: PostsRepository,
	) {}
	
	async getBlogById(id: string): Promise<IBlog | null> {
		return this.blogsRepository.getBlogById(id);
	}
	
	async createBlog(data: CreateBlogInputModel): Promise<string> {
		const { name, websiteUrl, description } = data;
		const newEntity = await BlogModel.createBlogEntity(name, websiteUrl, description);
		const createdBlog = await this.blogsRepository.save(newEntity);

		return String(createdBlog._id);
	}
	
	async updateBlog(id: string, data: UpdateBlogInputModel): Promise<void> {
		const targetBlog = await this.getBlogById(id);
		
		if (!targetBlog) throw new NotFoundError();
	
		const updatedBlog = await targetBlog.updateBlogData(data);
		await this.blogsRepository.save(updatedBlog);
	}
	
	async deleteBlog(id: string): Promise<void> {
		return this.blogsRepository.deleteBlog(id);
	}
	
	async createPostByBlogId(blogId: string, createPostData: CreateBlogPostInputModel): Promise<string> {
		const { title, content, shortDescription } = createPostData;
		const targetBlog = await this.getBlogById(blogId);
		
		if (!targetBlog) throw new NotFoundError();
		
		const createdPost = targetBlog.createPost({
			title,
			content,
			shortDescription,
			blogName: targetBlog.name,
			blogId: targetBlog._id
		});
		
		await this.postsRepository.save(createdPost);
		return String(createdPost._id);
	}
	
	async deleteAllBlogs(): Promise<void> {
		return this.blogsRepository.deleteAllBlogs();
	}
}
