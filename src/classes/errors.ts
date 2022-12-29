export class DataBaseError extends Error {
	constructor(message?: string) {
		const errorMessage = message
			? `Database error: ${message} :(`
			: "Database error! Something went wrong :("
		
		super(errorMessage);
	}
}