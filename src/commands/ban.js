const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
    const num = parseInt(args[1]);
    const options = {
        days: num < 8 && num > 0 ? num : 0
    };

    if (args.length >= 2) options.reason = args.slice(num ? 2 : 1).join(" ");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return bot.logger.warn("You can't ban in this server!");
    if (!message.mentions.members.size) return bot.logger.warn("User to ban not defined.");
	
    const member = message.mentions.members.first();

    if (!member.bannable) return bot.logger.info(`User ${member.user.tag} is not bannable.`);

    member.ban(options).then(user => {
        let banMSG;
		
        if (user instanceof GuildMember) banMSG = user.user.tag;
        else if (user instanceof User) banMSG = user.tag;
        else banMSG = `User ID ${user}`;
        banMSG += " was banned.";
	
        bot.logger.info(banMSG);
        message.channel.send(banMSG, {code:true});
    }).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "ban";
exports.type = "admin";
exports.description = "Bans a member from a guild";
exports.use = "[mention] <delete days> <reason>";
exports.aliases = [
    "banne",
    "delet",
    "bend"
];
