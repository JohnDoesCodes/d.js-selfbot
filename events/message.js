const slash = require("../slash.js");
const flag = require("../flags.js");
const slashReg = /^\/([^ ]+) ?/;
const flagReg = / -([aed]+) ?(\d+)?$/;

exports.run = (bot, message) => {
	
	if (message.author.id !== bot.user.id) return;

	const [, slashCMD] = slashReg.test(message.content) ? slashReg.exec(message.content) : [];

	if (slash[slashCMD]) return slash[slashCMD](bot, message);

	const [match, flags = "", time] = flagReg.test(message.content) ? flagReg.exec(message.content) : [];

	if (flags) return flag(bot, message, match, flags.toLowerCase().split(""), time);

	if (!message.content.startsWith(bot.config.prefix)) return;
	
	const [command = "", ...args] = message.content.slice(bot.config.prefix.length).split(/ +/);
	let cmdFile = bot.commands.get(command.toLowerCase());
	
	if (!cmdFile) cmdFile = bot.commands.get(bot.aliases.get(command.toLowerCase()));

	if (cmdFile) cmdFile.run(bot, message, args);
};

exports.event = "message";
