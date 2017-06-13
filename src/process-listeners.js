let unhandledCount = 0;

process.removeAllListeners("unhandledRejection");

process.on("rejectionHandled", () => {
    unhandledCount--;
});

process.on("unhandledRejection", err => {
    unhandledCount++;
    setTimeout(() => {
        if (unhandledCount) console.error("Rejection remained unhandled for 500ms:", err);
    }, 500);
});
