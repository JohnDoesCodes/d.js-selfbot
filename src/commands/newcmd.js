exports.run = (bot, message, args) => {
    if (!args.length) return bot.logger.log("No command file specified!");
    try {
        const cmdFile = require(`./${args[0]}.js`);

        bot.commands.set(args[0], cmdFile);

        for (let i = cmdFile.aliases.length; i--;) bot.aliases.set(cmdFile.aliases[i], args[0]);

        bot.logger.log("New command set!");
    } catch (err) {
        if (bot.commands.has(args[0])) bot.commands.delete(args[0]);
        bot.logger.error(err);
    }
};

exports.name = "newcmd";
exports.type = "utility";
exports.description = "Registers a new command.";
exports.use = "newcmd [command name]";
exports.aliases = [
    "addcmd"
];
