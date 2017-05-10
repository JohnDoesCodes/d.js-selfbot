const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
    const num = parseInt(args[1]);
    const options = {
        days: num < 8 && num > 0 ? num : 0
    };

    if (args.length > 2) options.reason = args.slice(2).join(" ");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return console.log("You can't ban in this server!");
    if (!message.mentions.members.size) return console.log("User to ban not defined.");
	
    const member = message.mentions.members.first();

    if (!member.bannable) return console.log(`User ${member.user.tag} is not bannable.`);

    member.ban(options).then(user => {
        let banMSG;
		
        if (user instanceof GuildMember) banMSG = user.user.tag;
        else if (user instanceof User) banMSG = user.tag;
        else banMSG = `User ID ${user}`;
        banMSG += " was banned.";
	
        console.log(banMSG);
        message.channel.send(banMSG, {code:true});
    }).catch(console.error);
};

exports.name = "ban";
exports.type = "admin";
exports.description = "Bans a member from a guild";
exports.use = "ban [mention] <delete days> <reason>";
exports.aliases = [
    "banne",
    "delet",
    "bend"
];
