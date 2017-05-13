const Client  = require("./src/client.js");
const bot     = new Client();

require("./src/util/logger.js");

bot.loadListeners();
bot.loadCommands();

bot.login();

process.on('unhandledRejection', (err, p) => logger.error("Unhandled Rejection at:", p));
