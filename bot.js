const Client  = require("./src/client.js");
const bot     = new Client();

const {Logger} = require("./src/util");

let unhandledCount = 0;

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

global.logger = new Logger(loggerOpts);

bot.login()
    .loadListeners()
    .loadCommands();

process.on("rejectionHandled", () => {
    unhandledCount--;
});

process.on("unhandledRejection", err => {
    unhandledCount++;
    setTimeout(() => {
        if (unhandledCount) logger.error("Unhandled rejection:", err);
    }, 5000);
});
