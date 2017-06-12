const fs = require("fs");

exports.run = (bot, message, args) => {
    let game = args.join(" ");
	
    if (!game) game = null;
    bot.config.startGame = game;
    bot.user.setGame(game).catch(bot.logger.error.bind(bot.logger));
    fs.writeFile("./config.json", JSON.stringify(bot.config, null, "\t"), err => err ? (bot.logger.error(err), message.edit("Failed to update config.")) : (bot.logger.info("Updated config successfully!"), message.edit("Config updated!")));
};

exports.name = "setstartgame";
exports.type = "utility";
exports.description = "Sets the game that is set on startup, and makes it the currently active game.";
exports.use = "[game]";
exports.aliases = [
    "startgame"
];
