const {RichEmbed} = require("discord.js");
const moment = require("moment");

exports.run = (bot, message, args) => {
    let channel = message.mentions.channels.first(), pos = 1;

    if (!channel || args[0] !== message.mentions.channels.first().toString()) {
        if (bot.channels.has(args[0])) {
            channel = bot.channels.get(args[0]);
        } else if (message.mentions.users.size && args[0] === message.mentions.users.first().toString()) {
            channel = message.mentions.users.first().dmChannel;
            if (!channel) return bot.logger.warn("No dm channel exists!");
        } else {
            pos = 0;
            channel = message.channel;
        }
    }

    if (!channel) return bot.logger.warn("No valid channel provided!");

    if (!args[pos]) return bot.logger.warn("No message ID provided!");
	
    const id = args[pos];

    channel.fetchMessage(id).then(msg => {
        const embed = new RichEmbed()
			.setAuthor(msg.member ? msg.member.displayName : msg.author.username, msg.author.displayAvatarURL)
			.setDescription(msg.content)
			.setFooter(`In ${channel.type === "text" ? `#${channel.name}` : `DM with ${channel.recipient.tag}`} | ${moment(msg.createdAt).format("dddd l [at] LTS")}`)
			.setColor(msg.member && msg.member.displayColor ? msg.member.displayColor : 0x50a0ce);

        const content = bot.config.prefix ? message.content.split(" ").slice(2 + pos).join(" ") : message.content.split(" ").slice(1 + pos).join(" ").replace(new RegExp(`${bot.config.suffix}quote$`), "");

        message.edit(content, {embed}).catch(bot.logger.error.bind(bot.logger));
    }).catch(() => bot.logger.error(`${id} is an invalid message id!`));
};

exports.name = "quote";
exports.type = "general";
exports.description = "Quotes a specified message.";
exports.use = "<channel id or channel mention or user mention> [message id]";
exports.aliases = [];
