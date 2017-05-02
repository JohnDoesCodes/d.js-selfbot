const request = require("snekfetch");

exports.run = (bot, message) => {
	request.get("https://random.cat/meow").then(response => {
		message.channel.send(response.body.file);
	});
};

exports.info = {
	name: "cat",
	description: "Sends a random cat image.",
	type: "general",
	use: "cat",
	aliases: []
};
