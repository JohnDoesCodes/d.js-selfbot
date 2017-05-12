const Client  = require("./src/client.js");
const bot     = new Client();

bot.loadListeners();
bot.loadCommands();

bot.login();

process.on('unhandledRejection', (err, p) => bot.logger.error("Unhandled Rejection at:", p));
