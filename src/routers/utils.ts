import {SortDirection, SortSetting} from "../repositories/interfaces";
import {SortByField} from "../interfaces/enums";
import {QueryParamsInputModel, QueryParamsOutputModel} from "../models/common-models";
import {NotFoundError} from "../classes/errors";

export const parseQueryParamsValues = (
	defaultValues: QueryParamsInputModel
): QueryParamsOutputModel  => {
	const { sortBy, sortDirection, pageNumber, pageSize, searchNameTerm } = defaultValues;
	const outputValues: QueryParamsOutputModel = {
		sortBy: sortBy ? SortByField[sortBy] : SortByField.createdAt,
		sortDirection: sortDirection ? Number(SortDirection[sortDirection]) : SortDirection.desc,
		pageSize: Number(pageSize) || 10,
		pageNumber: Number(pageNumber) || 1
	};
	
	if ("searchNameTerm" in defaultValues) outputValues.searchNameTerm = searchNameTerm || "";
	
	return outputValues;
};

export const countSkipValue = (pageNumber: number, pageSize: number): number => {
	return (pageNumber - 1) * pageSize;
};

export const setSortValue = (sortBy: SortByField, sortDirection: SortDirection): SortSetting => {
	return {[sortBy]: sortDirection};
};

export const getErrorStatus = (error: unknown): number => {
	return error instanceof NotFoundError ? 404 : 500;
};
