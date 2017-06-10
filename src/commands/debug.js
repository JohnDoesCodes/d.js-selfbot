const fs = require("fs");
const path = require("path");

exports.run = bot => {
    if (bot.listeners("debug").length) {
        bot.config.debug = true;
        fs.writeFile(path.join(__dirname, "..", "..", "config.json"), err => err ? logger.error(err) : logger.log("Updated config successfully!"));
        bot.on('debug', logger.info.bind(logger));
    } else {
        bot.config.debug = false;
        fs.writeFile(path.join(__dirname, "..", "..", "config.json"), err => err ? logger.error(err) : logger.log("Updated config successfully!"));
        bot.removeAllListeners('debug');
    }
};

exports.name = "debug";
exports.type = "utility";
exports.description = "Toggles extra debug info.";
exports.use = "";
exports.aliases = [];
