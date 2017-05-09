const fs = require("fs");

exports.run = (bot, message, args) => {
    let game = args.join(" ");
	
    if (!game) game = null;
    bot.config.startGame = game;
    bot.user.setGame(game).catch(console.error);
    fs.writeFile("./config.json", JSON.stringify(bot.config, null, "\t"), err => err ? console.error(err) : console.log("Updated config successfully!"));
};

exports.name = "setstartsame";
exports.type = "utility";
exports.description = "Sets the game that is set on startup, and makes it the currently active game.";
exports.use = "setStartGame [game]";
exports.aliases = [
    "startgame"
];
