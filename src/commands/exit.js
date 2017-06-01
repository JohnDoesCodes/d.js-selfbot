const {exec} = require("child_process");

exports.run = (bot, message) => {
    logger.info("Shutting down...");
    message.edit("Shutting down...");
    bot.user.setGame(null).then(() => exec(`pm2 stop ${bot.shard ? bot.shard.id : "selfbot"}`, null, () => process.exit()));
};

exports.name = "exit";
exports.type = "utility";
exports.description = "Entirely shuts down the bot using pm2.";
exports.use = "";
exports.aliases = [
    "quit"
];
