const path = require("path");
const fs = require("fs");

let files = fs.readdirSync(__dirname);

files = files.filter(a => a !== "index.js");

for (const file of files) exports[file] = require(path.join(__dirname, file));
