const {RichEmbed} = require("discord.js");
const moment = require("moment");

exports.run = (bot, message, args) => {
	let channel = message.mentions.channels.first(), pos = 1;

	if (!channel) {
		if (bot.channels.has(args[0])) {
			channel = bot.channels.get(args[0]);
		} else if (message.mentions.users.size && args[0] === message.mentions.users.first().toString()) {
			channel = message.mentions.users.first().dmChannel;
			if (!channel) return console.log("No dm channel exists!");
		} else {
			pos = 0;
			channel = message.channel;
		}
	}

	if (!channel) return console.log("No valid channel provided!");

	if (!args[pos]) return console.log("No message ID provided!");
	
	const id = args[pos];

	channel.fetchMessage(id).then(msg => {
		const embed = new RichEmbed()
			.setAuthor(msg.member ? msg.member.displayName : msg.author.username, msg.author.displayAvatarURL)
			.setDescription(msg.content)
			.setFooter(`In ${channel.type === "text" ? `#${channel.name}` : `DM with ${channel.recipient.tag}`} | ${moment(msg.createdAt).format("dddd l [at] LTS")}`)
			.setColor(msg.member && msg.member.displayColor ? msg.member.displayColor : 0x50a0ce);

		message.edit(message.content.split(" ").slice(2 + pos).join(" "), {embed}).catch(console.error);
	}).catch(() => console.error(`${id} is an invalid message id!`));
};

exports.name = "quote";
exports.type = "general";
exports.description = "Quotes a specified message.";
exports.use = "quote <channel id or channel mention or user mention> [message id]";
exports.aliases = [];
