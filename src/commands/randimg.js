const fs = require("fs");

exports.run = (bot, message, args) => {
    if (!fs.existsSync("./images/rand")) {
        try {
            fs.mkdirSync("./images/rand");

            return bot.logger.log("The directory images/rand did not exist, so it was created.\nPut images in there to be able to send them.");
        } catch (err) {
            bot.logger.error(err);
        }
    }
    fs.readdir("./images/rand", (err, files) => {
        if (err) return bot.logger.error(err);

        if (args.length) files = files.filter(a => a.startsWith(args.join("")));

        if (!files.length) return bot.logger.log("Specified tag not found.");
		
        const file = `./images/rand/${files[~~(Math.random() * files.length)]}`;

        message.channel.send({files:[file]})
			.then(() => message.delete())
			.catch(bot.logger.error);
    });
};

exports.name = "randimg";
exports.type = "meme";
exports.description = "Sends a random image with a possible prefix.";
exports.use = "randimg <tag>";
exports.aliases = [];
