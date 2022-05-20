const loggy = require("./loggy/loggy");

(async () => {
  // START BOT
  await loggy.client();
  // LOG SOME STUFF
  await loggy.log("PROUT");
  await loggy.log("HEYYYYY");
  await loggy.log("LET'S GO");

  // AND QUIT LOGGY IF YOU NEED IT
  loggy.quit();
})();
