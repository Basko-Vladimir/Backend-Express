import {Request} from "express";
import {SortByField, SortDirection} from "./enums";

export interface TypedRequestParams<P> extends Request<P> {}
export interface TypedRequestBody<B> extends Request<{}, {}, B> {}
export interface TypedRequestQuery<Q> extends Request<{}, {}, {}, Q> {}

export type EntityWithoutId<T> = Omit<T, "id" | "_id">;

export type SortSetting = {
	[key in SortByField]?: SortDirection
}
