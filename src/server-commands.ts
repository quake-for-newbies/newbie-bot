import { EmbedField, Message, TextChannel } from "discord.js";
import { getConfig } from "./config.js";
import { ServerInfo, serverMap } from "./games/index.js";
import groupBy from "lodash.groupby";

export const createServerStatus = (info: ServerInfo): EmbedField => {
  const mode = info.mode ? ` ${info.mode.toLowerCase()}` : "";
  let value = `[${info.players}/${info.playersMax}] _${info.gameName} ${mode}_ on _${info.level}_\n\nAddress: ${info.host}:${info.port}`;

  if (info.connectURI) {
    value += `\n${info.connectURI}`;
  }

  return {
    name: info.name,
    inline: false,
    value,
  };
};

export const serverStatus = async (message: Message) => {
  const serverGroups = groupBy(getConfig().servers, (s) => s.game);
  const statuses = (
    await Promise.all(
      Object.entries(serverGroups).map(([game, servers]) =>
        serverMap[game.toLowerCase()](
          servers.map((srv) => ({
            host: srv.ip,
            port: srv.port,
          }))
        )
      )
    )
  ).reduce((acc, curr) => acc.concat(curr), []);

  (message.channel as TextChannel).send({
    content: "Current server status:",
    embeds: [{
      color: 14540811,
      fields: statuses.map(createServerStatus),
    }]
  });
};
