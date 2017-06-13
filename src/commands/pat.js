const {get} = require("snekfetch");

exports.run = (bot, message) => {
    if (!message.mentions.users.size) return bot.logger.warn("You must mention someone!");

    get("https://imgur.com/r/headpats/hot.json").then(res => {
        const imageData = res.body.data[~~(Math.random() * res.body.data.length)];

        message.channel.send(`*pats ${message.mentions.users.first()}*`, {files:[`http://imgur.com/${imageData.hash}${imageData.ext.replace(/\?.*/, '')}`]}).then(() => message.delete());
    });
};

exports.name = "pat";
exports.type = "general";
exports.description = "Provides a random headpat image.";
exports.use = "[mention]";
exports.aliases = [
    "pet"
];
