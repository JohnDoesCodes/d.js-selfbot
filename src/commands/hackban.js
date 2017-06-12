const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
    if (!args.length) return bot.logger.log("User ID to ban not provided.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return bot.logger.warn("You don't have ban permission.");
	
    message.guild.ban(args[0]).then(user => {
        let banMSG;
		
        if (user instanceof GuildMember) banMSG = user.user.tag;
        else if (user instanceof User) banMSG = user.tag;
        else banMSG = `User ID ${user}`;
        banMSG += " was banned.";
		
        bot.logger.log(banMSG);
        message.channel.send(banMSG, {code:true});
    }).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "hackban";
exports.type = "admin";
exports.description = "Bans a user from a guild by ID.";
exports.use = "[user id]";
exports.aliases = [
    "idban",
    "hackbanne",
    "hackbean"
];
