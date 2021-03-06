const Google = require("googleapis");
const search = Google.customsearch("v1");

exports.run = (bot, message, args) => {
    if (!args.length) return bot.logger.log("No search provided");
    search.cse.list({
        cx:   bot.config.customsearch.id,
        auth: bot.config.customsearch.token,
        q:    args.join(" ")
    }, (err, response) => {
        if (err) return bot.logger.error(err);
        if (response.items && response.items.length) {
            message.edit(`${message.content}: <${response.items[0].link}>`);
            bot.logger.log(`~~~~~~~~SEARCH:"${response.queries.request[0].searchTerms}"~~~~~~~~\n` + response.items.map(a => `${a.title}: ${a.link}`).join("\n"));
        } else {
            bot.logger.info(JSON.stringify(response, null, 4));
        }
    });
};

exports.name = "google";
exports.type = "utility";
exports.description = "Googles using the Google API.";
exports.use = "[search query]";
exports.aliases = [
    "search",
    "lmgtfy",
    "g"
];
