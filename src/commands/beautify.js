const beautify = require("js-beautify").js_beautify;

exports.run = (bot, message, args) => {
    message.channel.fetchMessages({limit:100}).then(messages => {
        let code = /(`{3}|`)([^]+)\1/.exec(messages.get(args[0]) || messages.find(a => /`{3}|`/.test(a.content)).content)[2];
		
        code = code.replace(/^`([^]+?)`$/, "$1").replace(/^(?:js|javascript)\n?/i, "");
		
        message.edit(beautify(code, {indent_size:4}), {code:"js"}).catch(bot.logger.error.bind(bot.logger));
    }).catch(bot.logger.error.bind(bot.logger));
};

exports.name = "beautify";
exports.type = "utility";
exports.use = "<message id>";
exports.description = "Beautifies poorly formatted JavaScript.";
exports.aliases = [];
