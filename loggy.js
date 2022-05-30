require("discord.js");
const { Client, Intents } = require("discord.js");
require("dotenv").config();

class Loggy {
  discordJsClient;
  isBotConnected;
  tempMessagesStock;
  isDelayedQuittingNeeded;
  textFormatDiscordSyntax;
  messageParams;

  CHANNEL_ID_1;
  CHANNEL_ID_2;
  DISCORD_LOGGY_TOKEN;
  USER_ID;

  constructor() {
    this.discordJsClient = new Client
    (
      { 
      intents: [Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS] 
      }
    );
    this.tempMessagesStock = [];
    this.isBotConnected = false;
    this.isDelayedQuittingNeeded = false;
    this.textFormatDiscordSyntax = "```";
    this.messageParams = {};

    this.CHANNEL_ID_1 = process.env.CHANNEL_ID_1;
    this.CHANNEL_ID_2 = process.env.CHANNEL_ID_2;
    this.DISCORD_LOGGY_TOKEN = process.env.DISCORD_LOGGY_TOKEN;
    this.USER_ID = process.env.USER_ID;
  }

  async client(messageParams) {
    console.log("Loggy is launching");

    this.messageParams = messageParams || this.messageParams;

    this.discordJsClient.on("ready", async () => {
      this.isBotConnected = true;

      console.log("Loggy is ready to send logs on Discord")

      await this.processEachMessage();

      if (this.isDelayedQuittingNeeded === true) {
        this.quit();
      }
    });

    await this.discordJsClient.login(this.DISCORD_LOGGY_TOKEN);
  }

  async sendMessage(message, type, channelId, tempTagOn = false) {
    const logCasesFormatted = {
      log: [`${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax}`, "logUserTag"],
      alert: [`${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax}`, "errorUserTag"],
      error: [`${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax}`, "alertUserTag"],
      save: [`${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax}`, "saveUserTag"],
    };

    const userTagFormatted = `🔈 - <@${this.USER_ID.toString()}>`

    const builtMessage = logCasesFormatted[type][0] + 
      (
        this.messageParams[logCasesFormatted[type][1]] === true || tempTagOn === true 
        ? userTagFormatted 
        : ""
      );

    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache.get(channelId).send(builtMessage);
    } else {
      this.tempMessagesStock.push({
        content: builtMessage,
        channelId: channelId
      });
    }
  }

  async log(message, userTagOn) {
    await this.sendMessage(message, "log", this.CHANNEL_ID_1, userTagOn);
  }

  async alert(message, userTagOn) {
    await this.sendMessage(message, "alert", this.CHANNEL_ID_1, userTagOn);
  }

  async error(message, userTagOn) {
    await this.sendMessage(message, "error", this.CHANNEL_ID_1, userTagOn);
  }

  async save(message, userTagOn) {
    await this.sendMessage(message, "save", this.CHANNEL_ID_2, userTagOn);
  }

  async processEachMessage() {

    if (this.tempMessagesStock.length > 0) {
      for (const message of this.tempMessagesStock) {
        await this.discordJsClient.channels.cache.get(message.channelId).send(message.content);
      }
      this.tempMessagesStock.length = 0;
    }
  }

  quit() {
    let client = this.discordJsClient;
    if (this.isBotConnected) {
      console.log("Waiting for Loggy's deconnexion : 10sec...");
      setTimeout(async () => {
        await client.destroy();
        console.log("Loggy's client has been successfully destroyed");
      }, 10000);
    } else {
      this.isDelayedQuittingNeeded = true;
    }
  }
}

const loggy = new Loggy();

module.exports = loggy;
