import { query } from "express-validator";
import {SortDirection} from "../common/enums";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from "../common/constants";

export const commonQueryParamsSanitization = [
	query("sortBy").customSanitizer(sortBy => sortBy || "createdAt"),
	query("sortDirection").customSanitizer((sortDirection: SortDirection) => {
		return sortDirection ? SortDirection[sortDirection] : SortDirection.desc
	}),
	query("pageSize").toInt().customSanitizer(pageSize => pageSize || DEFAULT_PAGE_SIZE),
	query("pageNumber").toInt().customSanitizer(pageNumber => pageNumber || DEFAULT_PAGE_NUMBER)
];
