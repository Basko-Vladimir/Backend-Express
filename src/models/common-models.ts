import { ParamsDictionary } from "express-serve-static-core";

export interface ParamIdInputModel extends ParamsDictionary {
	id: string;
}
