import "discord.js";
import { Client, Intents } from "discord.js";
import "dotenv/config";

class Loggy {
  discordJsClient;
  isBotConnected;
  tempMessagesStock;
  isDelayedQuittingNeeded;
  textFormatDiscordSyntax;
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
    this.CHANNEL_ID_1 = process.env.CHANNEL_ID_1;
    this.CHANNEL_ID_2 = process.env.CHANNEL_ID_2;
    this.DISCORD_LOGGY_TOKEN = process.env.DISCORD_LOGGY_TOKEN;
    this.USER_ID = process.env.USER_ID;
  }

  async client() {
    console.log("Loggy is launching");

    this.discordJsClient.on("ready", () => {
      this.isBotConnected = true;

      this.processEachMessage();

      if (this.isDelayedQuittingNeeded === true) {
        this.quit();
      }
    });

    await this.discordJsClient.login(this.DISCORD_LOGGY_TOKEN);
  }

  async sendTaggedMessage(message, type, channelId) {
    const messages = {
      log: `${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${this.USER_ID.toString()}>`,
      alert: `${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax} 🔈 - <@${this.USER_ID.toString()}>`,
      error: `${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${this.USER_ID.toString()}>`,
      save: `${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${this.USER_ID.toString()}>`
    };

    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache.get(channelId).send(messages[type]);
    } else {
      this.tempMessagesStock.push({
        content: messages[type],
        channelId: channelId,
      });
    }
  }

  async sendMessageWithoutTag(message, type, channelId) {
    const messages = {
      log: `${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax}`,
      alert: `${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax}`,
      error: `${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax}`,
      save: `${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax}`
    };

    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache.get(channelId).send(messages[type]);
    } else {
      this.tempMessagesStock.push({
        content: messages[type],
        channelId: channelId,
      });
    }
  }

  async log(message, isUserTagOn) {
    if (isUserTagOn === true) {
      await this.sendTaggedMessage(message, "log", this.CHANNEL_ID_1);
      console.log("message normally sent");
    } else {
      await this.sendMessageWithoutTag(message, "log", this.CHANNEL_ID_1);
      console.log("message normally sent");
    }
  }

  async alert(message, isUserTagOn) {
    if (isUserTagOn === true) {
      await this.sendTaggedMessage(message, "alert", this.CHANNEL_ID_1);
      console.log("message normally sent");
    } else {
      await this.sendMessageWithoutTag(message, "alert", this.CHANNEL_ID_1);
      console.log("alert normally sent");
    }
  }

  async error(message, isUserTagOn) {
    if (isUserTagOn === true) {
      await this.sendTaggedMessage(message, "error", this.CHANNEL_ID_1);
      console.log("message normally sent");
    } else {
      await this.sendMessageWithoutTag(message, "error", this.CHANNEL_ID_1);
      console.log("error normally sent");
    }
  }

  async save(message, isUserTagOn) {
    if (isUserTagOn === true) {
      await this.sendTaggedMessage(message, "save", this.CHANNEL_ID_2);
      console.log("message normally sent");
    } else {
      await this.sendMessageWithoutTag(message, "save", this.CHANNEL_ID_2);
      console.log("message normally sent");
    }
  }

  async processEachMessage() {
    if (this.tempMessagesStock.length > 0) {
      for (const message of this.tempMessagesStock) {
        await this.discordJsClient.channels.cache.get(message.channelId).send(message.content);
        console.log("delayed message sent");
      }
      // clear stock
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
