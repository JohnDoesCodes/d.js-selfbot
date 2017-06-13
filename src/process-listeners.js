const {util:{Logger}} = require("./util");
let unhandledCount = 0;

const logger = new Logger();

process.removeAllListeners("unhandledRejection");

process.on("rejectionHandled", () => {
    unhandledCount--;
});

process.on("unhandledRejection", err => {
    unhandledCount++;
    setTimeout(() => {
        if (unhandledCount) logger.error("Rejection remained unhandled for 500ms:", err);
    }, 500);
});
