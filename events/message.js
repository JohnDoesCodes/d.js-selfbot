const slash = require("../slash.js");

module.exports = (bot, message) => {
	const regex = /^\/([^ ]+) ?/;
	
	if (message.author !== bot.user) return;

	const [, slashCMD] = regex.exec(message.content);

	if (slash[slashCMD]]) return slash[slashCMD](bot, message);

	if (!message.content.startsWith(bot.config.prefix)) return;
	
	const [command, ...args] = message.content.slice(bot.config.prefix.length).split(/ +/);
	let cmdFile = bot.commands.get(command.toLowerCase());
	
	if (!cmdFile) cmdFile = bot.commands.get(bot.aliases.get(command));

	if (cmdFile) cmdFile.run(bot, message, args);
};
