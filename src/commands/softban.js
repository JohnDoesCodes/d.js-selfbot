exports.run = (bot, message, args) => {
    const num = parseInt(args[1]);
    const options = {
        days: num < 8 && num > 0 ? num : 1
    };

    if (args.length >= 2) options.reason = args.slice(num ? 2 : 1).join(" ");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return logger.warn("You can't ban in this server!");
	
    const member = message.mentions.members.first() || message.guild.member(args[0]);

    if (!member) return logger.warn("User to ban not specified or member not found.");
    if (!member.bannable) return logger.warn(`${member.user.tag} is not bannable.`);

    member.ban(options)
		.then(user => message.guild.unban(user))
		.catch(logger.error);
};

exports.name = "softban";
exports.type = "admin";
exports.description = "Softly bans a member from a guild.";
exports.use = "softban [mention] <delete days> <reason>";
exports.aliases = [
    "softbanne",
    "softbend"
];
