import loggy from "./loggy.js";

  // START BOT
  await loggy.client(
    // set param to true for the types of messages where you want to be tagged on Discord
    // don't write the param line if you don't want to be tagged on this type of message
    // the example below : loggy.log() will not tag you on Discord, but .error(), .alert() and .save() will
    {
    // logUserTag : true, 
    errorUserTag : true, 
    alertUserTag : true, 
    saveUserTag : true
    }
  );

  // LOG SOME STUFF
  loggy.log("This is an absolutely normal log.");

  // pass a second arg set to "true" if you exceptionally want to be tagged on this particular .log line
  loggy.log("Always so normal log, but you are tagged on this one.");

  loggy.error("A wild error appears !");

  loggy.alert("An alert that alerts for alerting things.");

  loggy.save("Oh really, a message saved in another channel, that's awesome !");

  // AND QUIT LOGGY IF YOU NEED IT
  loggy.quit();