const loggy = require('./loggy/loggy')

const startLoggyClient = async () => {
  const client = await loggy.client()
  return client
}

const channelReady = async () => {
  const channel = await loggy.channelReady()
  return channel
}


startLoggyClient()
  .then((client) => {

    // console.log(client)
    channelReady()

      .then((channel) => {
        // DO SOME STUFF AND LOG IT ON DISCORD WITH logg(client, yourLogMessage)
        console.log('BANANE')
        loggy.log('PROUT')
        // AND QUIT LOGGY IF YOU NEED IT
        // loggy.quit(client)
      })

  })

