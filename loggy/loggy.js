require("discord.js");
const { Client, Intents } = require("discord.js");
require("dotenv").config();

class Loggy {
  discordJsClient;
  isBotConnected;
  tempMessagesStock;

  constructor() {
    this.discordJsClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    this.tempMessagesStock = [];
    this.isBotConnected = false;
  }

  async client() {
    console.log("Loggy is launching");
    // Just pour savoir ce qui ce passe
    this.discordJsClient.on("debug", (e) => {
      console.info(e);
    });
    this.discordJsClient.on("ready", () => {
      // Marquer le logger comme pret
      this.isBotConnected = true;
      // Envoyer les messages
      this.processEachMessage();
    });
    await this.discordJsClient.login(process.env.DISCORD_LOGGY_TOKEN);
  }

  log(message) {
    if (this.isBotConnected) {
      this.discordJsClient.channels.cache.get(process.env.CHANNEL_ID_LOGS).send(message);
    } else {
      this.tempMessagesStock.push(message);
    }
  }

  async processEachMessage() {
    if (this.tempMessagesStock.length > 0) {
      for (const message of this.tempMessagesStock) {
        await this.discordJsClient.channels.cache.get(process.env.CHANNEL_ID_LOGS).send(message);
      }
      // clear stock
      this.tempMessagesStock.length = 0;
    }
  }

  quit(client) {
    console.log("Waiting for Loggy's deconnexion : 10sec...");
    if (this.isBotConnected) {
      setTimeout(async function destroy() {
        await client.destroy();
      }, 10000);
    }
  }
}

const loggy = new Loggy();

module.exports = loggy;
