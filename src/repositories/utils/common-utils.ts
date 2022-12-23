import {SortDirection} from "../../models/enums";
import {DbSortDirection, SortSetting} from "../interfaces/common-interfaces";

export const countSkipValue = (pageNumber: number, pageSize: number): number => {
	return (pageNumber - 1) * pageSize;
};

export const setSortValue = (sortBy: string, sortDirection: SortDirection): SortSetting => {
	return {[sortBy]: sortDirection === SortDirection.asc ? DbSortDirection.ASC : DbSortDirection.DESC};
};

export const generateLengthErrorMessage = (param: string, value: number, type: "min" | "max"): string => {
	param = param[0].toUpperCase() + param.slice(1);
	
	switch (type) {
		case "min": {
			return `${param} length can't be less than ${value} symbol!`;
		}
		case "max": {
			return `${param} length can't be more than ${value} symbol!`;
		}
		default: throw Error ("Incorrect input parameters for generateLengthErrorMessage function");
	}
};
