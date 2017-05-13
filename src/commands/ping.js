exports.run = async (bot, message) => {
    message = await message.edit("Pinging...");
    await message.edit("Calculated Ping```\n" +
		"Websocket:       " + Math.round(bot.ping) + "ms\n" +
		"Response Time:   " + (message.editedTimestamp - message.createdTimestamp) + "ms\n" +
		"HTTP Round Trip: " + (Date.now() - message.createdTimestamp) + "ms\n```")
    .catch(logger.error);
};

exports.name = "ping";
exports.type = "utility";
exports.description = "Displays the overall ping.";
exports.use = "ping";
exports.aliases = [];
