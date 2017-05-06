exports.run = (bot, message) => {
	if (!message.mentions.members.size) return console.log("User to kick not defined.");
	
	const member = message.mentions.members.first();
	
	if (!member || !member.kickable || !message.guild.me.hasPermission("KICK_MEMBERS")) return console.log(`User ${member.user.username}#${member.user.discriminator} is not kickable.`);
	
	member.kick().then(user => {
		console.log(`${user.tag} was kicked.`);
		message.channel.send(`${user.tag} was kicked.`, {code:true});
	}).catch(console.error);
};

exports.name = "kick";
exports.type = "admin";
exports.description = "Kicks a member from a guild.";
exports.use = "kick [mention]";
exports.aliases = [
	"boot"
];
