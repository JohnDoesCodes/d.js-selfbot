exports.run = (bot, message, args = [""]) => {
    const cmdFile = bot.commands.get(args[0].toLowerCase()) || bot.commands.get(bot.aliases.get(args[0].toLowerCase()));

    if (!cmdFile) return bot.logger.warn(`${args[0]} is not a valid command name or alias.`);

    let use;
	
    if (bot.config.prefix) use = `${bot.config.prefix}${cmdFile.name} ${cmdFile.use}`;
    else use = `${cmdFile.use ? `${cmdFile.use} ` : ""}${bot.config.suffix}${cmdFile.name}`;

    message.edit(message.content, {embed: {
        title:       cmdFile.name.replace(/^(.)/, l => l.toString().toUpperCase()),
        description: cmdFile.description,
        url:         `https://github.com/EPICZEUS1/d.js-selfbot/blob/master/src/commands/${cmdFile.name}.js`,

        fields: [{
            name:  "Usage",
            value: use
        },
        {
            name:  "Aliases",
            value: cmdFile.aliases.length ? cmdFile.aliases.join(", ") : "None"
        }],
        footer: {
            text: "[] - required, <> - optional"
        },
        color: 0x4d68cc
    }}).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "info";
exports.type = "general";
exports.description = "Displays info about the specified command.";
exports.use = "[command or alias]";
exports.aliases = [
    "help"
];
