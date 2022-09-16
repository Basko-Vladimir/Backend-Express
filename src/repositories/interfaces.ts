import {SortByField} from "../interfaces/enums";

export enum SortDirection {
	desc = -1,
	asc = 1
}

export type SortSetting = {
	[key in SortByField]?: SortDirection
}
