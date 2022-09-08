import { ParamsDictionary } from "express-serve-static-core";
import {SortByField, SortDirection} from "../interfaces/enums";

export interface ParamIdInputModel extends ParamsDictionary {
	id: string;
}

export interface QueryParamsInputModel {
	sortBy: SortByField;
	sortDirection: SortDirection;
	pageNumber: string;
	pageSize: string;
	searchNameTerm?: string;
}

export interface QueryParamsOutputModel {
	sortBy: SortByField;
	sortDirection: SortDirection;
	pageNumber: number;
	pageSize: number;
	searchNameTerm?: string;
}
