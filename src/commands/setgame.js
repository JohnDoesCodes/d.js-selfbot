exports.run = (bot, message, args) => {
    const game = args.length ? args.join(" ") : null;

    bot.user.setGame(game).then(() => {
        bot.logger.info(game ? `New game set to '${game}'` : "Game cleared!");
        message.edit(game ? `New game set to '${game}'` : "Game cleared!");
    }).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "setgame";
exports.type = "utility";
exports.description = "Sets the game currently being played.";
exports.use = "[game name]";
exports.aliases = [
    "playing"
];
