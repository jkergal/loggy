import "discord.js";
import { Client, Intents } from "discord.js";
import "dotenv/config";

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
    this.discordJsClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
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
    console.log(this.messageParams);

    this.discordJsClient.on("ready", () => {
      this.isBotConnected = true;

      this.processEachMessage();

      if (this.isDelayedQuittingNeeded === true) {
        this.quit();
      }
    });

    await this.discordJsClient.login(this.DISCORD_LOGGY_TOKEN);
  }

  async sendMessage(message, type, channelId, tempTagOn = false) {
    const cases = {
      log: [`${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax}`, "logUserTag"],
      alert: [`${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax}`, "errorUserTag"],
      error: [`${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax}`, "alertUserTag"],
      save: [`${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax}`, "saveUserTag"],
    };

    const notify = () => (this.messageParams[cases[type][1]] === true || tempTagOn === true ? `🔈 - <@${this.USER_ID.toString()}>` : "");

    const buildMessage = cases[type][0] + notify();

    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache.get(channelId).send(buildMessage);
    } else {
      this.tempMessagesStock.push({
        content: buildMessage,
        channelId: channelId,
      });
    }
  }

  async log(message, userTagOn) {
    await this.sendMessage(message, "log", this.CHANNEL_ID_1, userTagOn);
    console.log("message normally sent");
  }

  async alert(message, userTagOn) {
    await this.sendMessage(message, "alert", this.CHANNEL_ID_1, userTagOn);
    console.log("message normally sent");
  }

  async error(message, userTagOn) {
    await this.sendMessage(message, "error", this.CHANNEL_ID_1, userTagOn);
    console.log("message normally sent");
  }

  async save(message, userTagOn) {
    await this.sendMessage(message, "save", this.CHANNEL_ID_2, userTagOn);
    console.log("message normally sent");
  }

  async processEachMessage() {
    if (this.tempMessagesStock.length > 0) {
      for (const message of this.tempMessagesStock) {
        await this.discordJsClient.channels.cache.get(message.channelId).send(message.content);
        console.log("delayed message sent");
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
        console.log("CLIENT HAS BEEN DESTROYED");
      }, 10000);
    } else {
      this.isDelayedQuittingNeeded = true;
    }
  }
}

const loggy = new Loggy();

export default loggy;
