exports.run = bot => {
    logger.log(`Logged in as ${bot.user.tag}`);
    bot.user.setGame(bot.config.startGame).then(() => logger.info("Initial game set."));
};

exports.event = "ready";
