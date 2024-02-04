import { ServerFinder, ServerInfo } from "../types";
import dgram from "dgram";
import { serverStatus } from "../../server-commands";

// \xFF\xFF\xFF\xFFgetstatus
const GET_STATUS = Uint8Array.from([
  0xff,
  0xff,
  0xff,
  0xff,
  0x67,
  0x65,
  0x74,
  0x73,
  0x74,
  0x61,
  0x74,
  0x75,
  0x73,
]);

export interface ServerCvars {
  dmflags: string;
  fraglimit: string;
  g_gametype: string;
  mapname: string;
  protocol: string;
  sv_allowDownload: string;
  sv_dlRate: string;
  sv_floodProtect: string;
  sv_fps: string;
  sv_hostname: string;
  sv_maxRate: string;
  sv_maxclients: string;
  sv_minRate: string;
  sv_privateClients: string;
  timelimit: string;
  version: string;
  g_maxGameClients: string;
  g_needpass: string;
  gamename: string;
  playerCount: number;
}

export type ServerStatus = ServerCvars & { host: string; port: number } & {
  [key: string]: string;
};

const getServerStatus = async (
  addr: string,
  port: number
): Promise<Readonly<ServerStatus>> => {
  return new Promise((resolve) => {
    const client = dgram.createSocket("udp4");
    client.connect(port, addr, () => {
      client.on("message", (msg) => {
        // Response is keys and values delimited by a backslash e.g.
        // \df_promode\1\dmflags\0\fraglimit\0\g_gametype\0\mapname\nood-hexagon
        // etc. and follows with the player list
        const parts = msg
          .filter((v) => v != 0xff) // get rid of prefix bytes
          .toString()
          .replace("statusResponse\n\\", "")
          .split("\\");

        // trim the player list off of the last value
        const playerCount = parts[parts.length - 1]
          .split("\n")
          .filter((v) => !!v)
          .slice(1).length;

        const rv = {
          host: addr,
          port: port,
          playerCount,
        } as Partial<ServerStatus>;
        parts.forEach((v, i) => {
          if (i % 2 === 0) {
            // evens are keys
            return;
          }

          // odds are values
          // remove the playerlist from the last part
          let value = v;
          if (i === parts.length - 1) {
            value = v.split("\n")[0];
          }

          rv[parts[i - 1]] = value;
        });

        client.close();
        resolve(rv as ServerStatus);
      });
      client.send(GET_STATUS);
    });
  });
};

export const findServers: ServerFinder = async (
  query
): Promise<ServerInfo[]> => {
  return (
    await Promise.all(
      query.map(({ host, port }) => getServerStatus(host, port))
    )
  ).map(({ host, port, ...status }) => ({
    host,
    port,
    gameName: status.gamename,
    level: status.mapname,
    name: status.sv_hostname,
    players: status.playerCount,
    playersMax: Number.parseInt(status.sv_maxclients),
  }));
};
