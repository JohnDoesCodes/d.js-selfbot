const {RichEmbed} = require("discord.js");

const getType = obj => {
    let desc;
    
    if (!obj[Symbol.iterator]) {
        desc = fixLines(obj.description);
        obj = obj.types;
    }
    
    const res = [];

    for (const o of obj) {
        const r = [];

        for (const a of o) r.push(a instanceof Array ? a.join("") : a);
        res.push(r.join(""));
    }
    let ret = res.join("|");

    if (desc) ret += " - " + desc;
    
    return ret;
};

const findClass = (obj, str, type) => {
    for (const c of obj) {
        if (c.name.toLowerCase() === str.toLowerCase()) {
            return {
                cls: c,
                url: `https://discord.js.org/#/docs/main/stable/${type}/${c.name}`
            };
        }
    }
};

const getClass = (docs, str) => findClass(docs.classes, str, "class") || findClass(docs.typedefs, str, "typedef") || {};

const findProperty = (obj, arg, type) => {
    if (obj) {
        for (const prop of obj) {
            if (prop.name.toLowerCase() === arg.toLowerCase()) {
                return {
                    prop,
                    type
                };
            }
        }
    }
};

const getProperty = (cls, arg) => findProperty(cls.props, arg, "property") || findProperty(cls.methods, arg, "method") || findProperty(cls.events, arg, "event") || {};

const listProps = obj => obj.filter(x => x.name[0] !== "_").map(x => x.name).join(", ");
const propCount = obj => obj.filter(x => x.name[0] !== "_").length;

const replaceMsg = (docs, msg) => {
    return msg
        .replace(/<info>([^]*)<\/info>/g, "*$1*")
        .replace(/<warn>([^]*)<\/warn>/g, "**Warning: $1**")
        .replace(/\*\*\*/g, "...\\*")
        .replace(/{@link (.*?)}/g, (match, p1) => {
            const [c, p] = p1.split("#");
            // eslint-disable-next-line prefer-const
            let {cls, url} = getClass(docs, c);

            if (p) {
                url += `?scrollTo=${p}`;
                cls.name += `#${p}`;
            }

            return `[${cls.name}](${url})`;
        });
};

const fixLines = msg => msg ? msg.replace(/([^.]\b)(\n(.*?\.))/g, "$1 $3") : msg;

exports.run = (bot, message, args) => {
    let pos = 1, docs = bot.docs[args[0]];

    if (!docs) {
        docs = bot.docs.stable;
        pos = 0;
    }

    args = args[pos].split(".");

    const embed = new RichEmbed()
        .setAuthor("discord.js", "https://discord.js.org/static/favicon.ico")
        .setColor("BLURPLE");
    // eslint-disable-next-line prefer-const
    let {cls, url} = getClass(docs, args[0]);

    if (!cls) return message.edit(`Couldn't find docs for ${args[0]}`);

    let msg;

    if (!args[1]) {
        msg = `[${cls.name}](${url}) ${cls.extends ? `*extends ${cls.extends.join(", ")}*` : ""}\n\n${fixLines(cls.description)}`;
        if (cls.type) msg += `\n\n**Types:** ${getType(cls.type)}`;
        if (cls.props && propCount(cls.props)) msg += `\n\n**Properties:** \`${listProps(cls.props)}\``;
        if (cls.methods && propCount(cls.methods)) msg += `\n\n**Methods:** \`${listProps(cls.methods)}\``;
        if (cls.events && propCount(cls.events)) msg += `\n\n**Events:** \`${listProps(cls.events)}\``;
        msg = replaceMsg(bot.docs, msg);
    } else {
        const {prop, type} = getProperty(cls, args[1]);

        if (!prop) return message.edit(`Couldn't find docs for ${args[0]}.${args[1]}`);

        if (!url.includes("typedef")) url += `?scrollTo=${prop.name}`;

        let c = cls.name;

        if (prop.scope !== "static") c = `<${c}>`;

        msg = `[${c}.${prop.name}`;

        if (type === "method") {
            const paramArray = [];
            
            if (prop.params) {
                for (const param of prop.params) {
                    if (param.name.includes(".")) continue;
                    let p = param.name;

                    if (param.optional) p = `[${p}]`;
                    paramArray.push(p);
                }
            }
            msg += `(${paramArray.join(", ")})`;
        }

        msg += `](${url}) - `;

        if (prop.scope === "static") msg += "static ";

        msg += type;

        if (prop.deprecated) msg += " **(deprecated)**";

        msg += `\n\n${fixLines(prop.description)}`;
        if (prop.type) msg += `\n**Type:** ${getType(prop.type)}`;
        if (prop.params) {
            msg += "\n\n**Parameters:**";
            for (const param of prop.params) msg += `\n • ${param.name}<${getType(param.type)}> - ${fixLines(param.description)}`;
        }
        if (prop.returns) msg += `\n\n**Returns:** ${getType(prop.returns)}`;
        msg = replaceMsg(bot.docs, msg);
        if (prop.examples) msg += `\`\`\`js\n${prop.examples.join("```\n```")}\`\`\``;
    }

    embed.setDescription(msg);

    message.edit({embed});
};

exports.name = "docs";
exports.description = "Finds documentation for discord.js";
exports.type = "utility";
exports.use = "docs [doc search]";
exports.aliases = [];
