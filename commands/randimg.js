const fs = require("fs");

exports.run = (bot, message, args) => {
	if (!fs.existsSync("./images/rand")) {
		try {
			fs.mkdirSync("./images/rand");

			return console.log("The directory images/rand did not exist, so it was created.\nPut images in there to be able to send them.");
		} catch (err) {
			console.error(err);
		}
	}
	let files = fs.readdirSync("./images/rand");

	if (args.length) files = files.find(a => a.startsWith(args.join("")));

	if (!files.length) return console.log("Specified tag not found.");
	
	const file = `./images/${files[~~(Math.random() * files.length)]}`;

	message.channel.send({file})
		.then(() => message.delete())
		.catch(console.error);
};

exports.info = {
	name: "randimg",
	type: "meme",
	description: "Sends a random image with a possible prefix.",
	use: "randimg <tag>",
	aliases: []
};
