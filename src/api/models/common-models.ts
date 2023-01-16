import { ParamsDictionary } from "express-serve-static-core";
import {SortDirection} from "../../common/enums";

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

export interface CommonQueryParamsModel<T> {
	sortBy: T;
	sortDirection: SortDirection;
	pageNumber: number;
	pageSize: number;
}
