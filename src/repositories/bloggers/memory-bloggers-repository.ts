import { IBlogger } from "../../interfaces/bloggers-interfaces";

let bloggers: IBlogger[] = [];

export const bloggersRepository = {
	async getAllBloggers(): Promise<IBlogger[]> {
		return bloggers;
	},
	async getBloggerById(id: string): Promise<IBlogger | null> {
		return bloggers.find(item => item.id === id) || null;
	},
	async deleteAllBloggers(): Promise<void> {
		bloggers = [];
	},
	async deleteBlogger(id: string): Promise<boolean> {
		const blogger = bloggers.find(item => item.id === id);
		
		if (!blogger) {
			return false;
		} else {
			bloggers = bloggers.filter(item => item.id !== id);
			return true;
		}
	},
	async createBlogger(name: string, youtubeUrl: string): Promise<IBlogger> {
		const newBlogger: IBlogger = {
			id: String(Date.now()),
			createdAt: new Date().toISOString(),
			youtubeUrl,
			name
		};
		
		bloggers.push(newBlogger);
		return newBlogger;
	},
	async updateBlogger(
		id: string,
		name: string,
		youtubeUrl: string
	): Promise<IBlogger | null> {
		bloggers = bloggers.map(item => item.id === id
			? {...item, name, youtubeUrl }
			: item
		);
		
		return bloggers.find(item => item.id === id) || null;
	}
}