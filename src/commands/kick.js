exports.run = (bot, message) => {
    
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return logger.warn("You don't have kick permission in this guild!");
	
    if (!message.mentions.members.size) return logger.warn("User to kick not defined.");
    
    const member = message.mentions.members.first();
    
    if (!member.kickable) return logger.warn(`User ${member.user.tag} is not kickable`);

    member.kick().then(user => {
        logger.log(`${user.tag} was kicked.`);
        message.channel.send(`${user.tag} was kicked.`, {code:true});
    }).catch(logger.error.bind(logger));
};

exports.name = "kick";
exports.type = "admin";
exports.description = "Kicks a member from a guild.";
exports.use = "[mention]";
exports.aliases = [
    "boot"
];
