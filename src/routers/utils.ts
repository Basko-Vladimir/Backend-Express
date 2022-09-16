import {SortByField} from "../interfaces/enums";
import {QueryParamsInputModel, QueryParamsOutputModel} from "../models/common-models";
import {NotFoundError} from "../classes/errors";
import {SortDirection} from "../repositories/interfaces/common-interfaces";

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

export const getErrorStatus = (error: unknown): number => {
	return error instanceof NotFoundError ? 404 : 500;
};
