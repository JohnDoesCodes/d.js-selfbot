exports.run = (bot, message) => {
    if (!message.mentions.members.size) return bot.logger.log("User to kick not defined.");
	
    const member = message.mentions.members.first();
	
    if (!member || !member.kickable || !message.guild.me.hasPermission("KICK_MEMBERS")) return bot.logger.log(`User ${member.user.username}#${member.user.discriminator} is not kickable.`);
	
    member.kick().then(user => {
        bot.logger.log(`${user.tag} was kicked.`);
        message.channel.send(`${user.tag} was kicked.`, {code:true});
    }).catch(bot.logger.error);
};

exports.name = "kick";
exports.type = "admin";
exports.description = "Kicks a member from a guild.";
exports.use = "kick [mention]";
exports.aliases = [
    "boot"
];
