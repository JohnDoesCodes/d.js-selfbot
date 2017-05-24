exports.run = (bot, message, args) => {
    const cmdFile = bot.commands.get(args[0]) || bot.commands.find(file => file.aliases.includes(args[0]));

    if (!cmdFile) return logger.warn(`${args[0]} is not a valid command name or alias.`);
	
    message.channel.send({embed: {
        title:       cmdFile.name.replace(/^(.)/, l => l.toString().toUpperCase()),
        description: cmdFile.description,

        fields: [
            {
                name:  "Usage",
                value: bot.config.prefix + cmdFile.use
            },
            {
                name:  "Aliases",
                value: cmdFile.aliases.length ? cmdFile.aliases.join(", ") : "None"
            }
        ],
        footer: {
            text: "[] - required, <> - optional"
        },
        color: 0x4d68cc
    }}).catch(logger.error);
};

exports.name = "info";
exports.type = "general";
exports.description = "Displays info about the specified command.";
exports.use = "info [command or alias]";
exports.aliases = [
    "help"
];
