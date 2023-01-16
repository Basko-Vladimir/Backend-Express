import {ParamsDictionary} from "express-serve-static-core";

export interface ParamDeviceSessionIdInputModel extends ParamsDictionary {
	deviceId: string;
}
