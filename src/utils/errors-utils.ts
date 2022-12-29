import {DataBaseError} from "../classes/errors";

export const getErrorStatus = (error: unknown): number => {
	return error instanceof DataBaseError ? 500 : 404;
};
