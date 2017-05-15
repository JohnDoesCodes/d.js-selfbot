exports.run = async (bot, message) => {
    message = await message.edit("Pinging...");
    message.edit("Calculated Ping```\n" +
		"Websocket:       " + Math.round(bot.ping) + "ms\n" +
		"Response Time:   " + (message.editedTimestamp - message.createdTimestamp) + "ms\n" +
		"HTTP Round Trip: " + (message.createdTimestamp - Date.now()) + "ms\n```")
    .catch(logger.error);
};

exports.name = "ping";
exports.type = "utility";
exports.description = "Displays the overall ping.";
exports.use = "ping";
exports.aliases = [];
