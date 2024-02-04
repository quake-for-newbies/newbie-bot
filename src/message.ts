import { Message } from "discord.js";
import { getConfig } from "./config";
import { serverStatus } from "./server-commands";

const SERVERS_TRIGGER = "servers";

export const handleHelp = (message: Message): void => {
  const { commands, commandPrefix } = getConfig();
  const cmdFmt = (cmd: string): string => `\`${commandPrefix}${cmd}\``;
  const customCommands = commands.map((v) => cmdFmt(v.trigger)).join(", ");
  message.channel.send(
    `
 Simple commands: ${customCommands}.

* ${cmdFmt(SERVERS_TRIGGER)} - display the status of Quake For Newbies servers.
  `.trim()
  );
};

export const handleMessage = (message: Message) => {
  const config = getConfig();

  if (message.author.bot || !message.content.startsWith(config.commandPrefix)) {
    return;
  }

  const command = message.content.substring(1);
  console.info("Received command", message.content, "from", message.author.tag);

  if (command === "newbiehelp") {
    handleHelp(message);
    return;
  }

  // try custom commands
  const custom = config.commands.find(
    (v) => v.trigger.toLowerCase() === command.toLowerCase()
  );

  if (custom) {
    message.channel.send(custom.response);
    return;
  }

  // server status
  if (command === SERVERS_TRIGGER) {
    serverStatus(message);
    return;
  }
};
