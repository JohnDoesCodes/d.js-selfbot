const fs = require("fs");
const path = require("path");

exports.run = (bot, message) => {
    if (bot.listeners("debug").length) {
        bot.config.debug = true;
        fs.writeFile(path.join(__dirname, "..", "..", "config.json"), err => err ? bot.logger.error(err) : bot.logger.log("Updated config successfully!"));
        bot.on('debug', bot.logger.info.bind(bot.logger));
        message.edit("Debug enabled!");
    } else {
        bot.config.debug = false;
        fs.writeFile(path.join(__dirname, "..", "..", "config.json"), err => err ? bot.logger.error(err) : bot.logger.log("Updated config successfully!"));
        bot.removeAllListeners('debug');
        message.edit("Debug disabled!");
    }
};

exports.name = "debug";
exports.type = "utility";
exports.description = "Toggles extra debug info.";
exports.use = "";
exports.aliases = [];
