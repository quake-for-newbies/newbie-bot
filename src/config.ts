import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
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

  const basePath = dirname(fileURLToPath(import.meta.url));
  const path = process.env.BOT_CONFIG_PATH || join(basePath, "..", "config.yaml");
  const file = fs.readFileSync(path, "utf8");
  parsedConfig = YAML.parse(file);
  return Object.assign({}, parsedConfig);
};
