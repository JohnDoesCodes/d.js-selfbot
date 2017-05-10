exports.run = bot => {
    console.log(`Logged in as ${bot.user.tag}`);
    bot.user.setGame(bot.config.startGame).then(() => console.log("Initial game set."));
};

exports.event = "ready";
