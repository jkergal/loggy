import "discord.js";
import { Client, Intents } from "discord.js";
import "dotenv/config"

class Loggy {
  discordJsClient;
  isBotConnected;
  tempMessagesStock;
  isDelayedQuittingNeeded;
  isMessageSentToChannel2;
  textFormatDiscordSyntax;
  // isQuitActionAsked;

  constructor() {
    this.discordJsClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    this.tempMessagesStock = [];
    this.isBotConnected = false;
    this.isDelayedQuittingNeeded = false;
    this.isMessageSentToChannel2 = false;
    this.textFormatDiscordSyntax = "```"
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
        this.quit()
      }
    });

    await this.discordJsClient.login(process.env.DISCORD_LOGGY_TOKEN);
  }

  async log(message) {
      if (this.isBotConnected) {
        await this.discordJsClient.channels.cache
          .get(process.env.CHANNEL_ID_1)
          .send(`${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax}`);
        console.log("message normally sent")
      } else {
        this.tempMessagesStock.push(`${this.textFormatDiscordSyntax}diff\n ${message}\n${this.textFormatDiscordSyntax}`);
      }
  }

  async alert(message) {
    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache
        .get(process.env.CHANNEL_ID_1)
        .send(`${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax} 🔈 - <@${process.env.USER_ID.toString()}>`);
      console.log("alert normally sent")
    } else {
      this.tempMessagesStock.push(`${this.textFormatDiscordSyntax}fix\n- 🔔 ALERT - ${message} \n${this.textFormatDiscordSyntax} 🔈 - <@${process.env.USER_ID.toString()}>`);
    }
  }

  async error(message) {
    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache
        .get(process.env.CHANNEL_ID_1)
        .send(`${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env.USER_ID.toString()}>`);
      console.log("error normally sent")
    } else {
      this.tempMessagesStock
        .push(`${this.textFormatDiscordSyntax}diff\n- ❌ ERROR - ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env.USER_ID.toString()}>`);
      
    }
  }
  
  async save(message) {
    if (this.isBotConnected) {
      await this.discordJsClient.channels.cache
        .get(process.env.CHANNEL_ID_2)
        .send(`${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env.USER_ID.toString()}>`);
      console.log("saved alert normally sent")
    } else {
      this.tempMessagesStock.push(`${this.textFormatDiscordSyntax}md\n# ${message}\n${this.textFormatDiscordSyntax} 🔈 - <@${process.env.USER_ID.toString()}>`);
      this.isMessageSentToChannel2 = true;
    }
  } 

  async processEachMessage() {
      if (this.tempMessagesStock.length > 0) {

        for (const message of this.tempMessagesStock) {

          if (this.isMessageSentToChannel2 === false) {
            await this.discordJsClient.channels.cache
              .get(process.env.CHANNEL_ID_1)
              .send(message);
            console.log("delayed message sent in channel 1")
          } else {
            await this.discordJsClient.channels.cache
              .get(process.env.CHANNEL_ID_2)
              .send(message);
            console.log("delayed message sent in channel 2")
          }
          
        }
        // clear stock
        this.tempMessagesStock.length = 0;
      }
  }

  quit() {
    let client = this.discordJsClient
    if (this.isBotConnected) {
      console.log("Waiting for Loggy's deconnexion : 10sec...");
      setTimeout(async () => {
        await client.destroy();
        console.log('CLIENT HAS BEEN DESTROYED')
      }, 10000);
    } else {
      this.isDelayedQuittingNeeded = true;
    }
  }
}

const loggy = new Loggy();

export default loggy;
