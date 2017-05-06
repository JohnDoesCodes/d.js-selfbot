const {exec} = require("child_process");

exports.run = bot => {
	console.log("Shutting down...");
	bot.user.setGame(null).then(() => exec(`pm2 stop ${bot.shard ? bot.shard.id : "selfbot"}`, null, () => process.exit()));
};

exports.info = {
	name: "exit",
	type: "utility",
	description: "Entirely shuts down the bot using pm2.",
	use: "exit",
	aliases: [
		"quit"
	]
};
