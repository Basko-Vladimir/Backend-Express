import {DbSortDirection, SortSetting} from "../interfaces/common-interfaces";
import {SortDirection} from "../../models/enums";

export const countSkipValue = (pageNumber: number, pageSize: number): number => {
	return (pageNumber - 1) * pageSize;
};

export const setSortValue = (sortBy: string, sortDirection: SortDirection): SortSetting => {
	return {[sortBy]: sortDirection === SortDirection.asc ? DbSortDirection.ASC : DbSortDirection.DESC};
};
