const loggy = require('./loggy/loggy')
const quitLoggy = require('./loggy/quitLoggy')
const launchLoggy = require('./loggy/launchLoggy')
const loggyNotification = require('./loggy/loggyNotification')

let loggyClient

async function createLoggyClient () {
  loggyClient = await launchLoggy()
}

createLoggyClient()

loggy(loggyClient, "PROUT")