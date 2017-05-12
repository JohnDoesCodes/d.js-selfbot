const beautify = require("js-beautify").js_beautify;

exports.run = (bot, message) => {
    message.channel.fetchMessages({limit:100}).then(messages => {
        let code = /(`{3}|`)([^]+)\1/.exec(messages.find(a => /`{3}|`/.test(a.content)).content)[2];
		
        code = code.replace(/`([^])`/, "$1").replace(/^(?:js|javascript)\n?/i, "");
		
        message.channel.send(beautify(code, {indent_size:4}), {code:"js"}).catch(bot.logger.error);
    }).catch(bot.logger.error);
};

exports.name = "beautify";
exports.type = "utility";
exports.use = "beautify";
exports.description = "Beautifies poorly formatted JavaScript.";
exports.aliases = [];
