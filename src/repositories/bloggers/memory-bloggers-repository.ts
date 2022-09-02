import { IBlogger } from "../../interfaces/bloggers-interfaces";

let bloggers: IBlogger[] = [];

export const memoryBloggersRepository = {
	async getAllBloggers() {
		return bloggers;
	},
	getBloggerById(id: number) {
		return bloggers.find(item => item.id === id);
	},
	deleteAllBloggers () {
		bloggers = [];
	},
	deleteBlogger(id: number) {
		const blogger = bloggers.find(item => item.id === id);
		
		if (!blogger) {
			return false;
		} else {
			bloggers = bloggers.filter(item => item.id !== id);
			return true;
		}
	},
	createBlogger(name: string, youtubeUrl: string) {
		const newBlogger: IBlogger = {
			id: Date.now(),
			youtubeUrl,
			name
		};
		
		bloggers.push(newBlogger);
		return newBlogger;
	},
	updateBlogger(id: number, name: string, youtubeUrl: string) {
		bloggers = bloggers.map(item => item.id === id
			? {...item, name, youtubeUrl }
			: item
		);
		
		return bloggers.find(item => item.id === id);
	}
}