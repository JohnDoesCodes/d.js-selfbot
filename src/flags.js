const letters = {
    a: "/-\\\\",
    b: "|o",
    c: "(",
    d: "|)",
    e: "3",
    f: "|=",
    g: "9",
    h: "|-|",
    i: "][",
    j: "\\_|",
    k: "|<",
    l: "|\\_",
    m: "|\\\\/|",
    n: "|\\\\|",
    o: "()",
    p: "|D",
    q: "(,)",
    r: "|Z",
    s: "5",
    t: "7",
    u: "|\\_|",
    v: "\\\\/",
    w: "|/\\\\|",
    x: "><",
    y: "\\`/",
    z: "(\\\\)"
};

module.exports = async (bot, message, [match, flags, time] = []) => {
    await message.edit(message.content.replace(match, ""));

    if (flags.includes("l") && message.content) message = await message.edit(message.content.replace(/:(\w+?):|[a-z]/gi, (l, m) => m ? l : letters[l.toString().toLowerCase()]).replace(/ /g, "   "));
    else if (flags.includes("a") && message.content) message = await message.edit(message.content.split("").join(" ").replace(/(< :[\w ]+?:[\d ]+?>)/g, (l, m) => m.replace(/ +/g, "")));

    if (flags.includes("e") && message.content) {
        const msg = await message.channel.send({embed: {
            description: message.content,
            color:       message.member && message.member.displayColor ? message.member.displayColor : 25555
        }});

        await message.delete();
        message = msg;
    }

    if (flags.includes("d")) {
        let timeout = time ? parseInt(time) * 1000 : 5000;

        if (isNaN(time)) timeout = 5000;

        message.delete({timeout});
    }
};
