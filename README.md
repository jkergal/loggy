# Loggy
A package that allows you to put your logs on your Discord server.

![image](https://johannkergal.fr/uploads-hosting/loggy-logo-banner.png)


## Features
Get the production logs of your app directly on your Discord server, using different methods, with different message formats, and chose if you want to get tagged or not on these messages. 

No more struggling with the Heroku console or other prod platforms, you can now use these different available methods with Loggy :

- `loggy.log("message")` 👉 a simple log
- `loggy.alert("message")` 👉 a log displayed in yellow
- `loggy.error("message")` 👉 an error log displayed in red

![image](https://johannkergal.fr/uploads-hosting/logs-loggy.png)
![image](https://johannkergal.fr/uploads-hosting/tagged-message.png)

- `loggy.save()` 👉 save a log in a secondary channel, to be sure to find it later

![image](https://johannkergal.fr/uploads-hosting/saved-log-loggy.png)

- `loggy.client()` 👉  to first connect to the bot client 
- `loggy.quit()` 👉  to quit Loggy in your app process if you need it



## Get Ready

### NPM
`npm install loggy-discord`

### Discord Bot Integration Setup
- go to your Discord developper portal : https://discord.com/developers/applications
- create an app called "Loggy"
- got to the created app, and create a bot in it called... "Loggy" (oh wow, surprising)
- don't forget to copy the secret Token of your to paste it in your .env file later

![image](https://johannkergal.fr/uploads-hosting/bot-token.png)

### Discord server preparation
Create two channels in your own Discord server : 
- one to post logs
- and one to post saved logs (channel 2) 
- put notifications settings of these chans on "only mentions"

### Environments variables
Put some env vars in a .env file, located a the root of your app :
```javascript
// you got it early, as shown above
DISCORD_LOGGY_TOKEN=your_secret_discord_bot_token 
// right click on your channel -> copy ID
CHANNEL_ID_1=discord_channel_id_where_you_want_logs
CHANNEL_ID_2=discord_channel_id_where_you_want_notifications
// right click on your profile pic somewhere in a chat -> copy ID
USER_ID=user_you_want_to_notify_in_chan
```

## How to use it in your app

```javascript
import loggy from "loggy-discord"; 
// note that, to use "import" in a nodeJS env, you have to add the line "type" : "module" in your package.json
// or use : 
// const loggy = require("loggy-discord")

  // START BOT
await loggy.client(
  // set param to true for the types of messages where you want to be tagged on Discord
  // don't write the param line if you don't want to be tagged on this type of message
  // the example below : loggy.log() will not tag you on Discord, but .error(), .alert() and .save() will
  {
    // logUserTag : true,
    errorUserTag : true,
    alertUserTag: true,
    saveUserTag : true
  }
);

// LOG SOME STUFF
loggy.log("This is an absolutely normal log.");

// pass a second arg set to "true" if you exceptionally want to be tagged on this particular .log line
loggy.log("Always so normal log, but you are tagged on this one.", true);

loggy.error("A wild error appears !");

loggy.alert("An alert that alerts for alerting things.");

loggy.save("Oh really, a message saved in another channel, that's awesome !");

// AND QUIT LOGGY IF YOU NEED IT
loggy.quit();

// use async / await in your app process to be sure that loggy.quit() is executing only after messages are sent
// you wan use await on loggy's methods (example : await loggy.log())
```

## Author

- [@jkergal](https://github.com/jkergal) (hello@johannkergal.fr)

## Contributor(s)

A big thank to 

- [@laticauda-64](https://github.com/laticauda-64)


## 🔗 Links
[![website](https://img.shields.io/badge/my_website-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://johannkergal.fr/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/johannkergal)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/zetyd)
