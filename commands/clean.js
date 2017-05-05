exports.run = (bot, message, args) => {
	const maxMessage = (args[0]) / 1 || 25;

	message.channel.fetchMessages({limit:100}).then(messages => {
		let msgArray = messages.array();
		
		msgArray = msgArray.filter(m => m.author.id == bot.user.id);
		msgArray.length = maxMessage + 1;
		for (let i = 0, len = msgArray.length; i < len; i++) msgArray[i].delete().catch(console.error);
	});
};

exports.info = {
	name: "clean",
	type: "utility",
	description: "Clears previously sent messages quickly.",
	use: "clean <delete count>",
	aliases: [
		"purge",
		"prune",
		"selfprune"
	]
};
