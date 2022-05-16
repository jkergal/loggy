const { Client, Intents } = require('discord.js');
require('dotenv').config()


module.exports = async function loggyClient () {
    console.log("Loggy is launching")

    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

    client.on('ready', () => {
        return console.log('READY TO DISPLAY LOGS !')
    })
    
    await client.login(process.env.DISCORD_LOGGY_TOKEN)

    return client
}


