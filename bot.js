const Client  = require("./src/client.js");
const self    = new Client();

const Logger = require("./src/util/logger.js");

/**
 * Adjust these to change how much logging is done.
 * time: whether to log the time with each log
 * useInfo: whether to log extra info
 * useWarn: whether to log warnings
 */
const loggerOpts = {
    time:    true,
    useInfo: true,
    useWarn: true,
};

global.logger = new Logger(loggerOpts);

self.loadListeners()
    .loadCommands()
    .login();

process.on('unhandledRejection', (err, p) => logger.error("Unhandled Rejection at:", p));
