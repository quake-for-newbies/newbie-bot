# Newbie Bot

A discord bot for the [Quake For Newbies](https://discord.io/QuakeForNewbies) discord community.

## Requirements

- Node.js v22+

## Setup

Install dependencies.

```
npm install
```

Create a [discord bot account](https://discordapp.com/developers/applications), create a bot user for the application, get it's token, set it in _.env.sample_ file and save it as _.env_.

Also make sure that all intents in the `Privileged Gateway Intents` are enabled - `Presence Intent`,
`Server Members Intent` and `Message Content Intent`.

Invite the bot into a server of your choosing:

[https://discordapp.com/api/oauth2/authorize?client_id=CLIENTIDHERE&scope=bot&permissions=519232](https://discordapp.com/api/oauth2/authorize?client_id=CLIENTIDHERE&scope=bot&permissions=519232)

Edit _config.yaml.sample_ and save it as _config.yaml_.

Build the bot and start it:

```
npm run build && npm start
```
