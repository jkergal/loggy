const loggy = require('./loggy/loggy')
const loggyClient = require('./loggy/loggyClient')
const quitLoggy = require('./loggy/quitLoggy')
// const loggyNotification = require('./loggy/loggyNotification')

const startLoggyClient = async () => {
  const client = await loggyClient()
  return client
}

startLoggyClient()
  .then((client) => {
    // DO SOME STUFF AND LOG IT ON DISCORD WITH logg(client, yourLogMessage)
    loggy.log(client, "PROUT")
    // AND QUIT LOGGY IF YOU NEED IT
    quitLoggy(client)
  })

