import { IBlogger } from "../interfaces/bloggers-interfaces";


let bloggers: IBlogger[] = [{
	id: "bloggerId-1",
	name: "Dimych",
	youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
}];

export const bloggersRepository = {
	getAllBloggers() {
		return bloggers;
	},
	getBloggerById(id: string) {
		return bloggers.find(item => item.id === id);
	},
	deleteAllBloggers () {
		bloggers = [];
	},
	deleteBlogger(id: string) {
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
			id: String(Date.now()),
			youtubeUrl,
			name
		};
		
		bloggers.push(newBlogger);
		return newBlogger;
	},
	updateBlogger(id: string, name: string, youtubeUrl: string) {
		bloggers = bloggers.map(item => item.id === id
			? {...item, name, youtubeUrl }
			: item
		);
		
		return bloggers.find(item => item.id === id);
	}
}