exports.run = (bot, message, args) => {
    if (!args.length) return logger.log("No command file specified!");
    try {
        const cmdFile = require(`./${args[0]}.js`);

        bot.commands.set(cmdFile.name, cmdFile);

        logger.info("New command set!");
        message.edit("New command set!");
    } catch (err) {
        if (bot.commands.has(args[0])) bot.commands.delete(args[0]);
        logger.error(err);
        message.edit("Failed to add new command: " + args[0]);
    }
};

exports.name = "newcmd";
exports.type = "utility";
exports.description = "Registers a new command.";
exports.use = "[command name]";
exports.aliases = [
    "addcmd"
];
