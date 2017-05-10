exports.run = (bot, message, args) => {
    const game = args.length ? args.join(" ") : null;

    bot.user.setGame(game)
		.then(() => console.log(`New game set to ${args.join(" ")}.`))
		.catch(console.error);
};

exports.name = "setgame";
exports.type = "utility";
exports.description = "Sets the game currently being played.";
exports.use = "setGame [game name]";
exports.aliases = [
    "playing"
];
