import loggy from "./loggy/loggy.js";

  // START BOT
  await loggy.client();
  // LOG SOME STUFF
  await loggy.log("Log absolument normal");
  await loggy.error("Ceci est une erreur olala");
  await loggy.alert("Une alerte qui alerte pour des choses alertantes");
  await loggy.save("Ceci est un message sauvegardé dans un autre chan juste au cas ou")

  // AND QUIT LOGGY IF YOU NEED IT
  loggy.quit()