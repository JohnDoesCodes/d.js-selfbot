const fs = require("fs");

exports.run = (bot, message, args) => {
    if (!fs.existsSync("./images/")) {
        try {
            fs.mkdirSync("./images/");
			
            return logger.info("The directory images/ did not exist, so it was created.\nPut images in there to be able to send them.");
        } catch (err) {
            logger.error(err);
        }
    }
    fs.readdir("./images", (err, files) => {
        if (err) return logger.error(err);

        const toUse = files.find(a => a.startsWith(args.join(" "))), file = `./images/${toUse}`;

        if (!toUse) return logger.warn("File not found.");

        message.channel.send({files:[file]})
			.then(() => message.delete())
			.catch(logger.error.bind(logger));
    });
};

exports.name = "img";
exports.description = "Sends a specified image.";
exports.type = "meme";
exports.use = "[image name]";
exports.aliases = [
    "image"
];
