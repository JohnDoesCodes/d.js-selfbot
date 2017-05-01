const Discord = require("discord.js");
const moment = require("moment");

require("moment-duration-format");

exports.run = (bot, message) => {
	const memory = process.memoryUsage();
	const memTotal = memory.heapTotal / 1024 / 1024, memUsed = memory.heapUsed / 1024 / 1024;
	const uptime = process.uptime() * 1000;

	const embed = new Discord.RichEmbed()
		.setTitle("Selfbot Info")
		.addField("Node Version", process.version, true)
		.addField("Discord.js Version", Discord.version, true)
		.addField("Owner", bot.user.tag, true)
		.addField("Process Uptime", moment.duration(uptime).format("D [days], H [hrs], m [mins], s [secs]"))
		.addField("Memory Use", `${memUsed.toFixed(2)}/${memTotal.toFixed(2)}MB`, true)
		.addField("Heartbeat Ping", `${bot.ping}ms`, true)
		.setColor(0x2d8244);

	message.channel.send({embed}).catch(console.error);
};

exports.info = {
	name: "botinfo",
	description: "Displays info about the bot",
	type: "general",
	use: "botinfo",
	aliases: [
		"selfinfo",
		"details"
	]
};
