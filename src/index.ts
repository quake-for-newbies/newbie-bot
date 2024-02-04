import dotenv from "dotenv";
import { env, exit } from "process";
import { getConfig } from "./config";
import Discord from "discord.js";
import { handleMessage } from "./message";

dotenv.config();
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

  const client = new Discord.Client();

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });
  client.on("message", handleMessage);
  client.login(token);
}

main();
