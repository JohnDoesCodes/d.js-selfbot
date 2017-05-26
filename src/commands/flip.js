const coin = ["heads", "tails"];

exports.run = (bot, message) => {
    message.channel.send(`You got ${coin[~~(Math.random() * 100) % 2]}!`).catch(logger.error);
};

exports.name = "flip";
exports.type = "general";
exports.description = "Flips a coin.";
exports.use = "";
exports.aliases = [];
