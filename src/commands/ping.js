exports.run = (bot, message) => {
    message.edit("Pinging...").then(msg => {
        msg.edit("Calculated Ping```\n" +
			"Websocket:       " + Math.round(bot.ping) + "ms\n" +
			"Response Time:   " + (msg.editedTimestamp - msg.createdTimestamp) + "ms\n" +
			"HTTP Round Trip: " + (Date.now() - msg.createdTimestamp) + "ms\n```")
		.catch(bot.logger.error);
    });
};

exports.name = "ping";
exports.type = "utility";
exports.description = "Displays the overall ping.";
exports.use = "ping";
exports.aliases = [];
