const {Client} = require("./src");

/**
 * Adjust these to change how much logging is done.
 * time: whether to log the time with each log
 * info: whether to log extra info
 * warn: whether to log warnings
 */

const bot = new Client({logger: {
    time: true,
    info: true,
    warn: true,
}});

bot.login();
