import {ErrorModel} from "../models/errors-models";

export class DataBaseError extends Error {
	constructor(message?: string) {
		const errorMessage = message
			? `Database error: ${message} :(`
			: "Database error! Something went wrong :("
		
		super(errorMessage);
	}
}

export class ApiError implements ErrorModel {
	message: string;
	field: string;
	
	constructor(message: string, field: string) {
		this.message = message;
		this.field = field;
	}
}
