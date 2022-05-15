require('discord.js');

module.exports = async function loggy(client, log) {

    const cli = await client
    const logChannel = await cli.channels.cache.get(process.env.CHANNEL_ID_LOGS)
    await logChannel.send(log)

}