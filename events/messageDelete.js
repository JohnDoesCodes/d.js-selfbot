const {RichEmbed} = require("discord.js");

exports.run = (bot, message) => {
	if (message.author.bot || (message.guild && bot.config.ignoreList.includes(message.guild.id)) || message.channel.id === bot.config.logChannel) return;

	const channel = bot.channels.get(bot.config.logChannel);
	
	if (channel) {
		channel.send({embed: new RichEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setDescription(message.content)
			.setColor(message.member && message.member.displayColor ? message.member.displayColor : 0x17900C)
			.setFooter(message.guild ? `Guild: ${message.guild.name}, Channel: ${message.channel.name}` : `In DM`, message.guild ? (message.guild.iconURL || bot.user.displayAvatarURL) : bot.user.displayAvatarURL)
			.setTimestamp(message.createdAt)
		});
	} else {
		console.log("Message from:", message.author.tag);
		message.guild ? console.log("Guild:", message.guild.name) : console.log("In DM");
		if (message.channel.name) console.log("Channel:", message.channel.name);
		console.log("Content:", message.content);
	}
	bot.deleted.set(message.author.id, message);
};

exports.event = "messageDelete";
