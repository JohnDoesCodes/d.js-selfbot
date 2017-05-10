const Client  = require("./src/client.js");
const bot     = new Client();

bot.loadListeners();

bot.loadCommands();

bot.login();

process.on('unhandledRejection', (err, p) => console.error("Unhandled Rejection at:", p));
