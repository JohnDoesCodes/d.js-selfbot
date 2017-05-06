const fs = require("fs");

exports.run = (bot, message, args) => {
	if (!fs.existsSync("./images/")) {
		try {
			fs.mkdirSync("./images/");
			
			return console.log("The directory images/ did not exist, so it was created.\nPut images in there to be able to send them.");
		} catch (err) {
			console.error(err);
		}
	}
	fs.readdir("./images", (err, files) => {
		if (err) return console.error(err);

		const toUse = files.find(a => a.startsWith(args.join(" "))), file = `./images/${toUse}`;

		if (!toUse) return console.log("File not found.");

		message.channel.send({files:[file]})
			.then(() => message.delete())
			.catch(console.error);
	});
};

exports.name = "img";
exports.description = "Sends a specified image.";
exports.type = "meme";
exports.use = "img [image name]";
exports.aliases = [
	"image"
];
