import { IBlogger } from "../../interfaces/bloggers-interfaces";

let bloggers: IBlogger[] = [];

export const bloggersRepository = {
	async getAllBloggers(): Promise<IBlogger[]> {
		return bloggers;
	},
	async getBloggerById(id: number): Promise<IBlogger | undefined> {
		return bloggers.find(item => item.id === id);
	},
	async deleteAllBloggers(): Promise<void> {
		bloggers = [];
	},
	async deleteBlogger(id: number): Promise<boolean> {
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
			id: Date.now(),
			youtubeUrl,
			name
		};
		
		bloggers.push(newBlogger);
		return newBlogger;
	},
	async updateBlogger(
		id: number,
		name: string,
		youtubeUrl: string
	): Promise<IBlogger | undefined> {
		bloggers = bloggers.map(item => item.id === id
			? {...item, name, youtubeUrl }
			: item
		);
		
		return bloggers.find(item => item.id === id);
	}
}