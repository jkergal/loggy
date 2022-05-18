require('discord.js');
const { Client, Intents, DataResolver } = require('discord.js');
require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

let channel


class Loggy {
    async client() {
        

        console.log("Loggy is launching")
                
        client.once('ready', () => {
            console.log('READY TO DISPLAY LOGS !')
            
        })

        client.login(process.env.DISCORD_LOGGY_TOKEN)

        // await isChannelReady().then((isChannelReady) => {
        //     console.log('le channel est ready :')
        //     return isChannelReady()
        // })

        // console.log(channelReady)

        return client

    }

    getChannel = () => {
        return new Promise((resolve) => {
            if(client.isReady() === true) {
                console.log(client.isReady())
                console.log('getting channel')
                channel = client.channels.cache.get(process.env.CHANNEL_ID_LOGS)
                resolve(channel)
            } else {
                console.log(client.isReady())
                setTimeout(() => {loggy.getChannel()}, 1000)
            }
        })
    }

    channelReady = async () => {

        let channelReady
    
        console.log("POMME")
        
        try {
            channelReady = await loggy.getChannel()
            console.log('fraise')
        } catch {
            console.error('error')
        }

        return channelReady
        
    }

    async log(message) {

        // const channel = await getChannel()
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


