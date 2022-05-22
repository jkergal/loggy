import "discord.js";
import { Client, Intents } from "discord.js";
import "dotenv/config";

class Loggy {
  discordJsClient;
  isBotConnected;
  tempMessagesStock;
  isDelayedQuittingNeeded;
  textFormatDiscordSyntax;
  // isQuitActionAsked;

  constructor() {
    this.discordJsClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    this.tempMessagesStock = [];
    this.isBotConnected = false;
    this.isDelayedQuittingNeeded = false;
    this.textFormatDiscordSyntax = "```";
    // this.isQuitActionAsked = false;
  }

  async client() {
    console.log("Loggy is launching");
    // Just pour savoir ce qui ce passe
    // this.discordJsClient.on("debug", (e) => {
    //   console.info(e);
    // });

    this.discordJsClient.on("ready", () => {
      // Marquer le logger comme pret
      this.isBotConnected = true;

      // Envoyer les messages
      this.processEachMessage();

      // Delayed quit action if needed
      if (this.isDelayedQuittingNeeded === true) {
        this.quit();
      }
    });

    await this.discordJsClient.login(process.env.DISCORD_LOGGY_TOKEN);
  }

  async sendMessage(message, type) {
    /**
     * All types of messages
     */
    const messages = {
      log: `${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax}`,
      alert: `${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax} 🔈 - <@${process.env?.USER_ID?.toString()}>`,
      error: `${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env?.USER_ID?.toString()}>`,
    };

    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache.get(process.env.CHANNEL_ID_1).send(messages[type]);
    } else {
      this.tempMessagesStock.push({
        content: messages[type],
        channelID: process.env.CHANNEL_ID_1,
      });
    }
  }

  async log(message) {
    await this.sendMessage(message, "log");
    console.log("message normally sent");
  }

  async alert(message) {
    await this.sendMessage(message, "alert");
    console.log("alert normally sent");
  }

  async error(message) {
    await this.sendMessage(message, "error");
    console.log("error normally sent");
  }

  async save(message) {
    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache
        .get(process.env.CHANNEL_ID_2)
        .send(`${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env?.USER_ID?.toString()}>`);
      console.log("saved alert normally sent");
    } else {
      this.tempMessagesStock.push({
        content: `${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env?.USER_ID?.toString()}>`,
        channelID: process.env.CHANNEL_ID_2,
      });
    }
  }

  async processEachMessage() {
    if (this.tempMessagesStock.length > 0) {
      for (const message of this.tempMessagesStock) {
        await this.discordJsClient.channels.cache.get(message.channelID).send(message.content);
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
