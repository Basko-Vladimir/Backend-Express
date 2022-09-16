import {SortByField} from "../../interfaces/enums";
import {SortDirection, SortSetting} from "../interfaces/common-interfaces";

export const countSkipValue = (pageNumber: number, pageSize: number): number => {
	return (pageNumber - 1) * pageSize;
};

export const setSortValue = (sortBy: SortByField, sortDirection: SortDirection): SortSetting => {
	return {[sortBy]: sortDirection};
};
