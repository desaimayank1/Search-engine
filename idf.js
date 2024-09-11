const fs = require("fs");
const path=require("path");
let usersPath = path.join(process.cwd(), 'IDF.txt');
const idfstr = fs.readFileSync(usersPath).toString();
const idf = idfstr.split("\n");

for (let i = 0; i < idf.length; i++) {
  idf[i] = Number(idf[i]);
}

module.exports = idf;
