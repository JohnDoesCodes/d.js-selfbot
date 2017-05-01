exports.run = (bot, message, args) => {
	let cmdFile = bot.commands.get(args[0]);

	if (!cmdFile) {
		cmdFile = bot.commands.get(bot.aliases.get(args[0]));
		if (!cmdFile) return console.log(`${args[0]} is not a valid command name or alias.`);
	}
	
	message.channel.send({
		embed: {
			title: cmdFile.info.name.replace(/^(.)/, l => l.toString().toUpperCase()),
			description: cmdFile.info.description,
			fields: [
				{
					name: "Usage",
					value: bot.config.prefix + cmdFile.info.use
				},
				{
					name: "Aliases",
					value: cmdFile.info.aliases.length ? cmdFile.info.aliases.join(", ") : "None"
				}
			],
			footer: {
				text: "[] - required, <> - optional"
			},
			color: 0x4d68cc
		}
	}).catch(console.error);
};

exports.info = {
	name: "info",
	type: "general",
	description: "Displays info about the specified command.",
	use: "info [command or alias]",
	aliases: [
		"help"
	]
};
