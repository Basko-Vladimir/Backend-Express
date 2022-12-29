import {ObjectId} from "mongodb";
import {BlogViewModel, CreateBlogModel} from "../models/blog-models";
import {blogsRepository} from "../repositories/blogs-repository";
import {mapObjectIdToId} from "../utils/id-utils";
import {Blog} from "../classes/blogs";

export const blogsService = {
	async getAllBlogs(): Promise<BlogViewModel[]> {
		const blogs = await blogsRepository.getAllBlogs();
		return blogs.map(mapObjectIdToId<BlogViewModel>);
	},
	
	async getBlogById(id: string): Promise<BlogViewModel> {
		const blog = await blogsRepository.getBlogById(new ObjectId(id));
		return mapObjectIdToId<BlogViewModel>(blog);
	},
	
	async createBlog(data: CreateBlogModel): Promise<BlogViewModel> {
		const { name, youtubeUrl } = data;
		const blogData = new Blog(name, youtubeUrl);
		const createdBlog = await blogsRepository.createBlog(blogData)
		
		return mapObjectIdToId(createdBlog);
	},
	
	async updateBlog(id: string, data: CreateBlogModel): Promise<void> {
		return blogsRepository.updateBlog(id, data);
	},
	
	async deleteBlog(id: string): Promise<void> {
		return blogsRepository.deleteBlog(new ObjectId(id));
	}
};
