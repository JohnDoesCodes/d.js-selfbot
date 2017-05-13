const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
    if (!args.length) return logger.log("User ID to ban not provided.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return logger.warn("You don't have ban permission.");
	
    message.guild.ban(args[0]).then(user => {
        let banMSG;
		
        if (user instanceof GuildMember) banMSG = user.user.tag;
        else if (user instanceof User) banMSG = user.tag;
        else banMSG = `User ID ${user}`;
        banMSG += " was banned.";
		
        logger.log(banMSG);
        message.channel.send(banMSG, {code:true});
    }).catch(logger.error);
};

exports.name = "hackban";
exports.type = "admin";
exports.description = "Bans a user from a guild by ID.";
exports.use = "hackban [user id]";
exports.aliases = [
    "idban",
    "hackbanne",
    "hackbean"
];
