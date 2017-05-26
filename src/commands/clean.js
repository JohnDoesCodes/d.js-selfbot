exports.run = (bot, message, args) => {
    const maxMessage = (args[0]) / 1 || 25;

    message.channel.fetchMessages({limit:100}).then(messages => {
        let msgArray = messages.array();
		
        msgArray = msgArray.filter(m => m.author.id === bot.user.id);
        msgArray.length = maxMessage + 1;
        for (let i = 0, len = msgArray.length; i < len; i++) msgArray[i].delete().catch(logger.error);
    });
};

exports.name = "clean";
exports.type = "utility";
exports.description = "Clears previously sent messages quickly.";
exports.use = "<delete count>";
exports.aliases = [
    "purge",
    "prune",
    "selfprune"
];
