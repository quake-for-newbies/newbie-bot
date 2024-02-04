export interface ServerInfo {
  gameName: string;
  name: string;
  level: string;
  mode?: string;
  host: string;
  port: number;
  players: number;
  playersMax: number;
  connectURI?: string;
}

export type ServerFinder = (
  query: { host: string; port: number }[]
) => Promise<Readonly<ServerInfo[]>>;
