const request = require("snekfetch");

exports.run = (bot, message) => {
    request.get("https://random.cat/meow").then(response => {
        message.channel.send(response.body.file);
    });
};

exports.name = "cat";
exports.description = "Sends a random cat image.";
exports.type = "general";
exports.use = "cat";
exports.aliases = [];
