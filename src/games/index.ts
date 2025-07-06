import { findServers as qlServerFinder } from "./ql/index.js";
import { findServers as q3ServerFinder } from "./q3/index.js";
import { ServerFinder } from "./types.js";

export * from "./types.js";

export type ServerMap = Readonly<{ [k: string]: ServerFinder }>;

export const serverMap: ServerMap = {
  ql: qlServerFinder,
  q3: q3ServerFinder,
};
