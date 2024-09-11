const fs = require("fs");
const path=require("path");
let usersPath = path.join(process.cwd(), 'problem-titles.txt');
const titlesstr = fs.readFileSync(usersPath).toString();
const titles = titlesstr.split("\n");

module.exports = titles;
