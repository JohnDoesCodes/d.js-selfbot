const {Client, util} = require("./src");

const bot = new Client();

/**
 * Adjust these to change how much logging is done.
 * time: whether to log the time with each log
 * info: whether to log extra info
 * warn: whether to log warnings
 */
const loggerOpts = {
    time: true,
    info: true,
    warn: true,
};

global.logger = new util.Logger(loggerOpts);

for (const key in logger) if (logger.hasOwnProperty(key) && logger[key] instanceof Function) logger[key] = logger[key].bind(logger);

bot.login()
    .loadListeners()
    .loadCommands();
