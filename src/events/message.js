const slash = require("../slash.js");
const flag  = require("../flags.js");

const slashReg = /^\/(\S)/;
const flagReg  = / -([aedl]+)(?: (\d+))?$/;

exports.run = (bot, message) => {
    if (bot.user.blocked.has(message.author.id)) message.channel.acknowledge();

    if (message.author.id !== bot.user.id) return;

    const [, slashCMD] = slashReg.exec(message.content) || [];

    if (slash[slashCMD]) return slash[slashCMD](bot, message);

    const flags = flagReg.exec(message.content);

    if (flags) return flag(bot, message, flags);

    if (!message.content.startsWith(bot.config.prefix)) return;

    const [command = "", ...args] = message.content.slice(bot.config.prefix.length).split(/ +/);
    const cmdFile = bot.commands.get(command.toLowerCase()) || bot.commands.get(bot.aliases.get(command.toLowerCase()));

    if (cmdFile) cmdFile.run(bot, message, args);
};

exports.event = "message";
