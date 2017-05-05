const {RichEmbed} = require("discord.js");

exports.run = (bot, message, args) => {
	const embed = new RichEmbed(), id = message.mentions.users.size ? message.mentions.users.first().id : args[0];
	const msg = bot.deleted.get(id);
	
	if (!msg) return console.log("No recently deleted message!");

	bot.deleted.delete(id);

	embed.setAuthor(msg.author.username, msg.author.displayAvatarURL)
		.setDescription(msg.content)
		.setColor(msg.member && msg.member.displayColor ? msg.member.displayColor : 0x50a0ce)
		.setFooter(`From: ${msg.guild ? msg.guild.name : "DM"}${msg.channel.name ? `, #${msg.channel.name}` : ""}`)
		.setTimestamp(msg.createdAt);

	message.edit(message.content.split(/ +/).slice(2).join(" "), {embed});
};

exports.info = {
	name: "undelete",
	description: "Resends a deleted message",
	type: "general",
	use: "undelete [user mention or id]",
	aliases: []
};
