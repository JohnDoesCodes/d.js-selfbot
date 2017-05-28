const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return logger.warn("You don't have ban permission.");
    if (!args[0]) return logger.warn("User ID to unban not provided.");

    message.guild.fetchBans().then(users => {
        const userToUnban = users.get(args[0]);

        if (!userToUnban) return logger.warn("The user ID is either invalid or not banned.");
        message.guild.unban(userToUnban).then(user => {
            let banMSG;

            if (user instanceof GuildMember) banMSG = user.user.tag ;
            else if (user instanceof User) banMSG = user.tag;
            else `User ID ${user}`;
				
            banMSG += " was unbanned.";
			
            logger.log(banMSG);
            message.channel.send(banMSG, {code:true});
        }).catch(logger.error.bind(logger));
    }).catch(logger.error.bind(logger));
};

exports.name = "unban";
exports.type = "admin";
exports.description = "Unbans a user from a guild.";
exports.use = "[user id]";
exports.aliases = [
    "unbanne",
    "unbend"
];
