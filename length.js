const fs = require("fs");
const lengthstr = fs.readFileSync("length.txt").toString();
const length = lengthstr.split("\n");
let cnt=0;
for (let i = 0; i < length.length; i++) {
  length[i] = Number(length[i]);
  cnt+=length[i];
}
// console.log(cnt);
// console.log(cnt/3023);

module.exports = length;
