exports.run = (bot, message, args = [""]) => {
    const cmdFile = bot.commands.get(args[0].toLowerCase()) || bot.commands.find(bot.aliases.get(args[0].toLowerCase()));

    if (!cmdFile) {
        message.edit(`${args[0]} is not a valid command name or alias`);

        return logger.info(`${args[0]} is not a valid command name or alias`);
    }

    delete require.cache[require.resolve(`./${cmdFile.name}.js`)];

    for (const alias of cmdFile.aliases) if (bot.aliases.get(alias) === cmdFile.name) bot.alias.delete(alias);
    
    bot.commands.delete(cmdFile.name);
    
    logger.info(`Command ${cmdFile.name} removed successfully.`);
    message.edit(`Command ${cmdFile.name} removed successfully.`);
};

exports.name = "delcmd";
exports.type = "utility";
exports.description = "Removes a specified command.";
exports.use = "[command name or alias]";
exports.aliases = [
    "deletecmd",
    "delcommand"
];
