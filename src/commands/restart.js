exports.run = bot => {
    bot.logger.info("Restarting...");
    process.exit();
};

exports.name = "restart";
exports.type = "utility";
exports.description = "Exits the process gracefully and lets pm2 turn it back on.";
exports.use = "restart";
exports.aliases = [];
