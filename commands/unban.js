const {User, GuildMember} = require("discord.js");

exports.run = (bot, message, args) => {
	if (!args[0]) return console.log("User ID to unban not provided.");
	if (!message.guild.me.hasPermission("BAN_MEMBERS")) return console.log("You don't have ban permission.");
	
	message.guild.fetchBans().then(users => {
		const userToUnban = users.get(args[0]);

		if (!userToUnban) return console.log("The user ID is either invalid or not banned.");
		message.guild.unban(userToUnban).then(user => {
			let banMSG;

			if (user instanceof GuildMember) banMSG = user.user.tag ;
			else if (user instanceof User) banMSG = user.tag;
			else `User ID ${user}`;
				
			banMSG += " was unbanned.";
			
			console.log(banMSG);
			message.channel.send(banMSG, {code:true});
		}).catch(console.error);
	}).catch(console.error);
};

exports.info = {
	name: "unban",
	type: "admin",
	description: "Unbans a user from a guild.",
	use: "unban [user id]",
	aliases: [
		"unbanne",
		"unbend"
	]
};
