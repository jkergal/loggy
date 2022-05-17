const loggy = require('./loggy/loggy')

const startLoggyClient = async () => {
  const client = await loggy.client()
  return client
}

startLoggyClient()
  .then((client) => {
    // DO SOME STUFF AND LOG IT ON DISCORD WITH logg(client, yourLogMessage)
    // console.log(client)
    loggy.log('PROUT')
    // AND QUIT LOGGY IF YOU NEED IT
    // loggy.quit(client)
  })

