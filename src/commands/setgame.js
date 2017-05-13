exports.run = (bot, message, args) => {
    const game = args.length ? args.join(" ") : null;

    bot.user.setGame(game)
		.then(() => logger.info(game ? `New game set to '${game}'` : "Game cleared!"))
		.catch(logger.error);
};

exports.name = "setgame";
exports.type = "utility";
exports.description = "Sets the game currently being played.";
exports.use = "setGame [game name]";
exports.aliases = [
    "playing"
];
