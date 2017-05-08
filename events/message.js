const slash = require("../slash.js");

exports.run = (bot, message) => {
	const regex = /^\/([^ ]+) ?/;
	
	if (message.author.id !== bot.user.id) return;

	const slashCMD = regex.exec(message.content);

	if (slashCMD && slash[slashCMD[1]]) return slash[slashCMD[1]](bot, message);

	if (!message.content.startsWith(bot.config.prefix)) return;
	
	const [command, ...args] = message.content.slice(bot.config.prefix.length).split(/ +/);
	let cmdFile = bot.commands.get(command.toLowerCase());
	
	if (!cmdFile) cmdFile = bot.commands.get(bot.aliases.get(command.toLowerCase()));

	if (cmdFile) cmdFile.run(bot, message, args);
};

exports.event = "message";
