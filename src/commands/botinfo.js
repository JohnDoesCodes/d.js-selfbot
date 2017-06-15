const Discord = require("discord.js");
const moment  = require("moment");
const fs      = require("fs");

require("moment-duration-format");

exports.run = (bot, message) => {
    const memory = process.memoryUsage();
    const memUsed = memory.heapUsed / 1024 / 1024;

    const {version} = JSON.parse(fs.readFileSync("./package.json"));

    const embed = new Discord.RichEmbed()
        .setAuthor("Selfbot Info", bot.user.displayAvatarURL)
        .setDescription(`**Selfbot Version**: v${version}\n**Github Repo**: [d.js-selfbot](https://github.com/EPICZEUS1/d.js-selfbot)\n**Author:** EPICZEUS#2700 (153214789160534016)`)
        .addField("Details", "```" +
            "Node Version: " + process.version +
            "\nD.js Version: v" + Discord.version +
            `\nMemory Use:     ${memUsed.toFixed(2)}MB` +
            "\nProcess Uptime: " + moment.duration(process.uptime() * 1000).format("D [days], H [hrs], m [mins], s [secs]") +
            `\nHeartbeat Ping: ${Math.floor(bot.ping)}ms` + "```")
        .setColor(0x2d8244);

    message.edit({embed}).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "botinfo";
exports.description = "Displays info about the bot";
exports.type = "general";
exports.use = "";
exports.aliases = [
    "selfinfo",
    "details",
    "stats"
];
