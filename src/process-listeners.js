const {Logger} = require("./util");
const logger = new Logger();
const unhandled = new Set();

setInterval(() => {
    unhandled.forEach(p => {
        logger.error("Unhandled rejection:", p);
    });

    unhandled.clear();
}, 900000);

process.removeAllListeners("unhandledRejection");

process.on("rejectionHandled", p => {
    unhandled.delete(p);
});

process.on("unhandledRejection", (err, p) => {
    unhandled.add(p);
});
