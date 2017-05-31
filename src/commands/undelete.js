const {RichEmbed} = require("discord.js");
const moment = require("moment");

exports.run = (bot, message, args) => {
    const embed = new RichEmbed(), id = message.mentions.users.size && message.mentions.users.first().toString() == args[0] ? message.mentions.users.first().id : args[0];
    const msg = bot.deleted.get(id);
    
    if (!msg) return logger.warn("No recently deleted message!");

    bot.deleted.delete(id);

    embed.setAuthor(msg.author.username, msg.author.displayAvatarURL)
        .setDescription(msg.content)
        .setFooter(`From: ${msg.guild ? msg.guild.name : "DM"}${msg.channel.name ? `, #${msg.channel.name}` : ""} | ${moment(msg.createdAt).format("dddd l [at] LTS")}`)
        .setColor(msg.member && msg.member.displayColor ? msg.member.displayColor : 0x50a0ce);

    message.edit(message.content.split(/ +/).slice(1).join(" "), {embed});
};

exports.name = "undelete";
exports.description = "Resends a deleted message";
exports.type = "general";
exports.use = "[user mention or id]";
exports.aliases = [];
