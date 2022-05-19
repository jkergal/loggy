require("discord.js");
const { Client, Intents, DataResolver } = require("discord.js");
require("dotenv").config();

class Loggy {
  discordJsClient;

  constructor() {
    this.discordJsClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
  }

  async client() {
    console.log("Loggy is launching");

    this.discordJsClient.once("ready", () => {
      console.log("READY TO DISPLAY LOGS !");
    });

    await this.discordJsClient.login(process.env.DISCORD_LOGGY_TOKEN);
  }

  async log(message) {
    await this.discordJsClient.channels.cache.get(process.env.CHANNEL_ID_LOGS).send(message);
  }

  quit(client) {
    console.log("Waiting for Loggy's deconnexion : 10sec...");

    setTimeout(async function destroy() {
      await client.destroy();
    }, 10000);
  }
}

const loggy = new Loggy();

module.exports = loggy;
