const {get} = require("snekfetch");

exports.run = (bot, message) => {
    get("https://random.cat/meow").then(response => {
        message.edit(response.body.file);
    });
};

exports.name = "cat";
exports.description = "Sends a random cat image.";
exports.type = "general";
exports.use = "";
exports.aliases = [];
