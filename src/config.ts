import fs from "fs";
import { join } from "path";
import YAML from "yaml";

export interface ConfigServer {
  ip: string;
  port: number;
  game: string;
}

export interface ConfigCommand {
  trigger: string;
  response: string;
}

export interface Config {
  servers: ConfigServer[];
  commandPrefix: string;
  commands: ConfigCommand[];
}

let parsedConfig: Config;

export const getConfig = (): Readonly<Config> => {
  if (parsedConfig) {
    return parsedConfig;
  }

  const file = fs.readFileSync(join(__dirname, "..", "config.yaml"), "utf8");
  parsedConfig = YAML.parse(file);
  return Object.assign({}, parsedConfig);
};
