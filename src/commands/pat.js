const ura = require("unique-random-array");
const {get} = require("snekfetch");

let images;

exports.run = async (bot, message) => {
    if (!message.mentions.users.size) return bot.logger.warn("You must mention someone!");

    if (!images) {
        const data = await get("https://imgur.com/r/headpats/hot.json");

        images = ura(data.body.data);
    }
    const imageData = images();

    message.edit(`*pats ${message.mentions.users.first()}* http://imgur.com/${imageData.hash}${imageData.ext.replace(/\?.*/, '')}`);
};

exports.name = "pat";
exports.type = "general";
exports.description = "Provides a random headpat image.";
exports.use = "[mention]";
exports.aliases = [
    "pet"
];
