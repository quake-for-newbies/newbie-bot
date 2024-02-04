import { findServers as qlServerFinder } from "./ql";
import { findServers as q3ServerFinder } from "./q3";
import { ServerFinder } from "./types";

export * from "./types";

export type ServerMap = Readonly<{ [k: string]: ServerFinder }>;

export const serverMap: ServerMap = {
  ql: qlServerFinder,
  q3: q3ServerFinder,
};
