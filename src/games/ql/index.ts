import { ServerFinder, ServerInfo } from "../types";
import got from "got";
import { ServerListReponse, Server } from "./types";

const now = () => new Date().getTime();

let lastRequested = 0;
let lastResponse: Server[] = [];

export const getServerList = async (): Promise<Server[]> => {
  // syncore's server browser auto updates every 90 sec.
  const UPDATE_RATE = 90_000;

  if (now() - lastRequested < UPDATE_RATE) {
    return lastResponse;
  }

  const response = await got<ServerListReponse>(
    "https://ql.syncore.org/api/servers",
    {
      responseType: "json",
    }
  );

  const servers = response.body.servers;
  lastRequested = now();
  lastResponse = Array.from(servers);
  return response.body.servers;
};

export const createConnectURI = (host: string, port: number): string =>
  `https://quakenewbies.com/connect/${host}:${port}`;

export const findServers: ServerFinder = async (
  query
): Promise<ServerInfo[]> => {
  const servers = (await getServerList()).filter((v) => {
    return query.reduce(
      (acc, curr) => (curr.host === v.ip && curr.port === v.port) || acc,
      false as boolean // tsc be weird sometimes
    );
  });

  return servers.map(({ ip, port, ...server }) => ({
    port,
    host: ip,
    gameName: "Quake Live",
    level: server.info.map,
    mode: server.info.game,
    name: server.info.serverName,
    players: server.info.players,
    playersMax: server.info.maxPlayers,
    connectURI: createConnectURI(ip, port),
  }));
};
