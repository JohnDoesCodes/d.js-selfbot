exports.run = bot => {
    bot.logger.info(`Logged in as ${bot.user.tag}`);
    bot.user.setGame(bot.config.startGame).then(() => bot.logger.info("Initial game set."));
};

exports.event = "ready";
