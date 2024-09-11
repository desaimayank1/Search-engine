const fs = require("fs");
const path=require("path");
let usersPath = path.join(process.cwd(), 'keywords.txt');
const keywordsstr = fs.readFileSync(usersPath).toString();
const keywords = keywordsstr.split("\n");
module.exports = keywords;
