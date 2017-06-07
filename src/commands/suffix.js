const fs = require("fs");

exports.run = (bot, message, args) => {
    if (!args[0]) {
        return message.reply("The current suffix is " + bot.config.suffix);
    } else if (args[0].length > 4) {
        return message.reply("The new suffix is too long");
    } else {
        bot.config.suffix = args[0];
        bot.config.prefix = null;
        fs.writeFile('./config.json', JSON.stringify(bot.config, null, "\t"), err => err ? logger.error(err) : logger.log("Updated config successfully!"));
        message.reply("New prefix set to " + bot.config.suffix);
    }
};

exports.name = "suffix";
exports.type = "utility";
exports.description = "Sets the suffix for commands, or displays the current.";
exports.use = "<new suffix>";
exports.aliases = [];
