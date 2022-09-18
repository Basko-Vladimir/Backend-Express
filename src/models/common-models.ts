import { ParamsDictionary } from "express-serve-static-core";

export interface ParamIdInputModel extends ParamsDictionary {
	id: string;
}

export interface AllEntitiesOutputModel<T> {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: T[];
}