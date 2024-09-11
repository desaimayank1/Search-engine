const fs = require("fs");
const path=require("path");
let usersPath = path.join(process.cwd(), 'problem-urls.txt');
const urlsstr = fs.readFileSync(usersPath).toString();
const urls = urlsstr.split("\n");

module.exports = urls;
