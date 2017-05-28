const Discord = require("discord.js");
const moment  = require("moment");
const fs      = require("fs");

require("moment-duration-format");

exports.run = (bot, message) => {
    const memory = process.memoryUsage();
    const memTotal = memory.heapTotal / 1024 / 1024, memUsed = memory.heapUsed / 1024 / 1024;

    const {version} = JSON.parse(fs.readFileSync("./package.json"));

    const embed = new Discord.RichEmbed()
		.setAuthor("Selfbot Info", bot.user.displayAvatarURL)
        .setDescription(`**Selfbot Version**: v${version}\n**Github Repo**: [d.js-selfbot](https://github.com/EPICZEUS1/d.js-selfbot)`)
		.addField("Node Version", process.version, true)
		.addField("Discord.js Version", Discord.version, true)
		.addField("Author", "**TAG:** `EPICZEUS#2700`\n**ID:** `153214789160534016`", true)
		.addField("Process Uptime", moment.duration(process.uptime() * 1000).format("D [days], H [hrs], m [mins], s [secs]"), true)
		.addField("Memory Use", `${memUsed.toFixed(2)}/${memTotal.toFixed(2)}MB`, true)
		.addField("Heartbeat Ping", `${Math.floor(bot.ping)}ms`, true)
		.setColor(0x2d8244);

    message.edit({embed}).catch(logger.error.bind(logger));
};

exports.name = "botinfo";
exports.description = "Displays info about the bot";
exports.type = "general";
exports.use = "";
exports.aliases = [
    "selfinfo",
    "details"
];
