import "discord.js";
import { Client, Intents } from "discord.js";
import "dotenv/config"

class Loggy {
  discordJsClient;
  isBotConnected;
  tempMessagesStock;
  isDelayedQuittingNeeded;
  // isQuitActionAsked;

  constructor() {
    this.discordJsClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    this.tempMessagesStock = [];
    this.isBotConnected = false;
    this.isDelayedQuittingNeeded = false;
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
          .get(process.env.CHANNEL_ID_LOGS)
          .send(message);
        console.log("message normally sent")
      } else {
        this.tempMessagesStock.push(message);
      }
  }

  async processEachMessage() {
      if (this.tempMessagesStock.length > 0) {
        for (const message of this.tempMessagesStock) {
          await this.discordJsClient.channels.cache
            .get(process.env.CHANNEL_ID_LOGS)
            .send(message);
            console.log("delayed message sent")
        }
        // clear stock
        this.tempMessagesStock.length = 0;
      }
  }

  quit() {
    let client = this.discordJsClient
    console.log(`quit isBotConnected : ${this.isBotConnected}`)
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
