require('discord.js');

module.exports = function quitLoggy(client) {

    console.log("Waiting for Loggy's deconnexion : 10sec...")
    
    setTimeout(
        async function destroy() {
        await client.destroy()
    }, 10000)

};