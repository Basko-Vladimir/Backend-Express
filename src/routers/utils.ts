import {NotFoundError} from "../classes/errors";

export const getErrorStatus = (error: unknown): number => {
	return error instanceof NotFoundError ? 404 : 500;
};
