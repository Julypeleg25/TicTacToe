import { players } from "./consts";

export type Player = (typeof players)[keyof typeof players];
