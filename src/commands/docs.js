const {RichEmbed} = require("discord.js");

function findClass(obj, name, type) {
    for (const c of obj) {
        if (c.name.toLowerCase() === name.toLowerCase()) {
            return {
                cls: c,
                url:   `https://discord.js.org/#/docs/main/stable/${type}/${c.name}`
            };
        }
    }
    
    return null;
}

function getClass(docs, toFind) {
    return findClass(docs.classes, toFind, "class") || findClass(docs.typedefs, toFind, "typedef") || {};
}

function findProperty(obj, name, type) {
    if (obj) {
        for (const prop of obj) {
            if (prop.name.toLowerCase() === name.toLowerCase()) {
                return {
                    prop,
                    type
                };
            }
        }
    }

    return null;
}

function getProperty(cls, name) {
    return findProperty(cls.props, name, "property") || findProperty(cls.methods, name, "method") || findProperty(cls.events, name, "events");
}

function fixLines(msg) {
    return msg ? msg.replace(/([^.]\b)(\n(.*?\.))/g, "$1 $3") : msg;
}

function getType(obj) {
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
}

function replaceMsg(msg) {
    return msg
    .replace(/<info>([^]*)<\/info>/g, "*$1*")
    .replace(/<warn>([^]*)<\/warn>/g, "**Warning: $1**")
    .replace(/\*\*\*/g, "...\\*")
    .replace(/{@link (.*?)}/g, (match, p1) => {
        const [c, p] = p1.split("#");
        const ret = getClass(c);
        const {cls} = ret;
        let {url} = ret;

        if (p) {
            url += `?scrollTo=${p}`;
            cls.name += `#${p}`;
        }

        return `[${cls.name}](${url})`;
    });
}

function getProps(obj) {
    return obj.filter(x => x.name[0] !== "_");
}

exports.run = (bot, message, args) => {
    const embed = new RichEmbed();

    if (!args.length) return logger.warn("Missing arguments!");

    const split = args[0].split(".");
    const [toFind] = split;
    let [, prop] = split;

    const {cls, url} = getClass(bot.docs, toFind);

    if (!cls) return logger.warn(`Class ${toFind} was not found!`);

    embed.setAuthor("discord.js", "https://discord.js.org/static/favicon.ico")
        .setColor("BLURPLE");
    
    if (!prop) {
        embed.setTitle(cls.name)
            .setURL(url)
            .setDescription(fixLines(cls.description));
        if (cls.type) embed.addField("Type", replaceMsg(getType(cls.type)));
        if (cls.props && getProps(cls.props).length) embed.addField("Properties", getProps(cls.props).map(a => a.name).join(", "));
        if (cls.methods && getProps(cls.methods).length) embed.addField("Methods", getProps(cls.methods).map(a => a.name).join(", "));
        if (cls.events && getProps(cls.events)) embed.addField("Events", getProps(cls.methods).map(a => a.name).join(", "));
    } else {
        let type;

        if (prop) ({prop, type} = getProperty(cls, prop));
        
        if (!prop) return logger.warn(`Unable to find property ${prop}!`);

        let c = cls.name;

        if (prop.scope !== "static") c = `<${c}>`;
        c = c += `.${prop.name}`;

        if (prop.params) {
            const params = [];
            
            for (const param of prop.params) {
                let p = param.name;

                if (param.optional) p = `[${p}]`;
                params.push(p);
            }
            embed.setTitle(c + `(${params.join(", ")})`);
        }
        embed.setURL(url + (!url.includes("typedef") ? `?scrollTo=${prop.name}` : ""))
            .setDescription(fixLines(prop.description));

        if (prop.params) {
            const params = [];
            
            for (const param of prop.params) params.push(`${param.name}<${getType(param.type)}> - ${fixLines(param.description)}`);
            embed.addField("Parameters", params.join("\n"));
        }
        embed.addField("Type", type);
        
        if (prop.returns) embed.addField("Returns", replaceMsg(getType(prop.returns)));
        if (prop.examples) embed.addField("Examples", "```js\n" + prop.examples.join("```\n```js\n") + "```");
    }

    message.edit({embed});
};

exports.name = "docs";
exports.description = "Finds documentation for discord.js";
exports.type = "utility";
exports.use = "docs [doc search]";
exports.aliases = [];
