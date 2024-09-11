const fs = require("fs");
const path=require("path");
let usersPath = path.join(process.cwd(), 'IDF.txt'); //so that server know where the txt file is present 
const idfstr = fs.readFileSync(usersPath).toString();//process.cwd() reads the file IDF.txt from the root of the repository.
const idf = idfstr.split("\n"); 

for (let i = 0; i < idf.length; i++) {
  idf[i] = Number(idf[i]);
}

module.exports = idf;
