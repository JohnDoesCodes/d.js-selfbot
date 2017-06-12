const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return bot.logger.warn("You don't have ban permission.");
    if (!args[0]) return bot.logger.warn("User ID to unban not provided.");

    message.guild.fetchBans().then(users => {
        const {user} = users.get(args[0]) || {};
        
        return user;
    }).then(user => user ? message.guild.unban(user) : null).then(unbanned => {
        if (!unbanned) {
            bot.logger.warn(`${args[0]} is not a valid unban target!`);

            return message.edit(`${args[0]} is not a valid unban target!`);
        }

        let banMSG;

        if (unbanned instanceof GuildMember) banMSG = unbanned.user.tag;
        else if (unbanned instanceof User) banMSG = unbanned.tag;
        else `User ID ${unbanned}`;
            
        banMSG += " was unbanned.";
        
        bot.logger.log(banMSG);

        return message.channel.send(banMSG, {code:true});
    }).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "unban";
exports.type = "admin";
exports.description = "Unbans a user from a guild.";
exports.use = "[user id]";
exports.aliases = [
    "unbanne",
    "unbend"
];
