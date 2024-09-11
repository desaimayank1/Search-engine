const fs = require("fs");
const path=require("path");
let usersPath = path.join(process.cwd(), 'Magnitude.txt');
const magnitudestr = fs.readFileSync(usersPath).toString();
const magnitude = magnitudestr.split("\n");
// console.log(magnitude);
for (let i = 0; i < magnitude.length; i++) {
  magnitude[i] = Number(magnitude[i]);
}

// console.log(magnitude);

module.exports = magnitude;
