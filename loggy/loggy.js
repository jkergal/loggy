require('discord.js');
const { Client, Intents } = require('discord.js');
require('dotenv').config()

let channel 

class Loggy {
    async client() {
        const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

        console.log("Loggy is launching")
                
        client.once('ready', () => {
            console.log('READY TO DISPLAY LOGS !')
        })

        client.login(process.env.DISCORD_LOGGY_TOKEN)

        channel = client.channels.cache.get((process.env.CHANNEL_ID_LOGS))
        
        // function getChannel() {
        //     console.log(client.isReady())
        //     if(client.isReady() === false) {
        //         console.log("PROUT")
        //        setTimeout(getChannel, 1000); /* this checks the flag every 100 milliseconds*/
        //     } else {
        //         console.log(client.isReady())
        //         console.log('getting channel')
        //         channel = client.channels.cache.get((process.env.CHANNEL_ID_LOGS))
        //         return
        //     }
        // }

        // getChannel()

        return client
    }

        async log(message) {

            await channel
            channel.send(message)
            // console.log(channelID)

        }
        
        // async alert(client, message) {
        
        //     const userId = process.env.USER_ID
        //     const logChannel = await client.channels.cache.get(process.env.CHANNEL_ID_NOTIFICATIONS)
        //     logChannel.send(`${message} --- <@${userId.toString()}>`)
        
        // }    

        // async error(client, message) {
        
        //     const userId = process.env.USER_ID
        //     const cli = await client
        //     const logChannel = await cli.channels.cache.get(process.env.CHANNEL_ID_NOTIFICATIONS)
        //     await logChannel.send(`${message} --- <@${userId.toString()}>`)
        
        // }

        quit(client) {

            console.log("Waiting for Loggy's deconnexion : 10sec...")
            
            setTimeout(
                async function destroy() {
                await client.destroy()
            }, 10000)
        
        }
}

const loggy = new Loggy()

module.exports = loggy


