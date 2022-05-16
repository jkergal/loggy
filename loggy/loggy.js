require('discord.js');

class Loggy {
        async log(client, message) {

            const logChannel = await client.channels.cache.get(process.env.CHANNEL_ID_LOGS)
            logChannel.send(message)
        
        }
        
        async alert(client, message) {
        
            const userId = process.env.USER_ID
            const cli = await client
            const logChannel = await cli.channels.cache.get(process.env.CHANNEL_ID_NOTIFICATIONS)
            await logChannel.send(`${message} --- <@${userId.toString()}>`)
        
        }    

        async error(client, message) {
        
            const userId = process.env.USER_ID
            const cli = await client
            const logChannel = await cli.channels.cache.get(process.env.CHANNEL_ID_NOTIFICATIONS)
            await logChannel.send(`${message} --- <@${userId.toString()}>`)
        
        }  
}

const loggy = new Loggy()

module.exports = loggy


