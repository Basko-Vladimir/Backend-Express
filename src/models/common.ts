import { ParamsDictionary } from "express-serve-static-core";

enum SortDirection {
	ASC = "asc",
	DESC = "desc"
}

export interface IdParamModel extends ParamsDictionary{
	id: string;
}

export interface QueryParamsModel {
	pageNumber?: string;
	pageSize?: string;
	sortBy?: string;
	sortDirection?: SortDirection;
}
