import loggy from "./loggy/loggy.js";

  // START BOT
  await loggy.client();
  // LOG SOME STUFF
  loggy.log("Log absolument normal", true);
  loggy.error("Ceci est une erreur olala", true);
  loggy.alert("Une alerte qui alerte pour des choses alertantes", true);
  loggy.save("Ceci est un message sauvegardé dans un autre chan juste au cas ou", true)

  // AND QUIT LOGGY IF YOU NEED IT
  loggy.quit()