const request = require("snekfetch");

exports.run = (bot, message) => {
    request.get("https://random.dog/woof.json").then(res => {
        message.edit(res.body.url);
    });
};

exports.name = "dog";
exports.type = "general";
exports.description = "Gets a random dog image";
exports.use = "";
exports.aliases = [
    "doggo"
];
