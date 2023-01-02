import { ParamsDictionary } from "express-serve-static-core";
import {SortByField} from "../interfaces/enums";
import {SortDirection} from "../repositories/interfaces";

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
