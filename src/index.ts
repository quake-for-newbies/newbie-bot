import dotenv from "dotenv";
import { env, exit } from "process";
import { getConfig } from "./config.js";
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import { handleMessage } from "./message.js";

dotenv.config({quiet: true});
const token = env.BOT_TOKEN;

if (!token) {
  console.error("BOT_TOKEN not found in the environment!");
  exit(1);
}

async function main() {
  try {
    getConfig();
  } catch (e) {
    console.error("config.yaml not found or it's invalid!");
    exit(2);
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [
      Partials.Channel,
      Partials.Message // needed to receive DMs
    ]
  });

  client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });
  client.on(Events.MessageCreate, handleMessage);
  client.login(token);
}

main();
