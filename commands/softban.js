exports.run = (bot, message, args) => {
	const num = parseInt(args[1]), removeLength = args[1] && num < 8 && num > 0 ? num : 1;

	if (!message.guild.me.hasPermission("BAN_MEMBERS")) return console.log("You can't ban in this server!");
	
	const member = message.mentions.members.first() || message.guild.member(args[0]);

	if (!member) return console.log("User to ban not specified or member not found.");
	if (!member.bannable) return console.log(`${member.user.tag} is not bannable.`);

	member.ban(removeLength)
		.then(user => message.guild.unban(user))
		.catch(console.error);
};

exports.name = "softban";
exports.type = "admin";
exports.description = "Softly bans a member from a guild.";
exports.use = "softban [mention] <delete days>";
exports.aliases = [
	"softbanne",
	"softbend"
];
