import {UpdateOrFilterModel} from "../../../common/interfaces";

export const enum DbSortDirection {
	ASC = 1,
	DESC = -1
}

export type SortSetting = UpdateOrFilterModel<DbSortDirection>;
