const { removeStopwords } = require("stopword");
const removePunc = require("remove-punctuation");

// const cosineSimilarity = require("./cosine_similarity");
// const documents = [
//   "The sky is Blue",
//   "The sun is bright today",
//   "The sun in the sky is bright",
//   "We can see the shining sun, the bright sun",
// ];

/**
 * const dockeywords = [
 * [blue,sky]
 * [bright,sun,today]
 * [sun,sky,sun]
 * [bright,see,shining,sun,sun]
 * ]
 * 
 * const keywords = [blue,bright,see,shining,sky,sun,today]
 */

//here we extract every question in documents array 
let documents = [];
const fs = require("fs");
const path = require("path");
const N = 3023;
for (let i = 1; i <= N; i++) {
  const str = path.join(__dirname, "Problems");
  const str1 = path.join(str, `problem_text_${i}.txt`);
  console.log(str1);
  const question = fs.readFileSync(str1).toString();
  //   console.log(question);
  documents.push(question);
  // console.log(str1);
}

//here we extract key words from documents array for each documents and save key words of each doc as vector in 2d matrix
let docKeywords = [];
for (let i = 0; i < documents.length; i++) 
{
  const lines = documents[i].split("\n");
  const docWords = [];
  for (let k = 0; k < lines.length; k++) {
    const temp1 = lines[k].split(" ");
    temp1.forEach((e) => {
      e = e.split("\r");
      if (e[0].length) docWords.push(e[0]);
    });
  }
  // const oldString = documents[i].split(" ");
  const newString = removeStopwords(docWords);
  newString.sort();
  let temp = [];
  for (let j = 0; j < newString.length; j++) {
    newString[j] = newString[j].toLowerCase();
    newString[j] = removePunc(newString[j]);
    if (newString[j] !== "") temp.push(newString[j]);
  }
  docKeywords.push(temp);
}


//here we are saving the length of each documents in length.txt file also keeping sum var to store total length on keywords
let sum = 0;
for (let i = 0; i < N; i++) {
  const length = docKeywords[i].length;
  sum += length;
  fs.appendFileSync("length.txt", length + "\n");
  console.log(length);
}

//this will generate the list of all the unique keywords in all the documents 
let keywords = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < docKeywords[i].length; j++) {
    if (keywords.indexOf(docKeywords[i][j]) === -1)  //indexof() return index of element if present else -1
      keywords.push(docKeywords[i][j]);
  }
}
keywords.sort();
//appending all the keywords in a file called keywords.txt 
const W = keywords.length;
keywords.forEach((word) => {
  fs.appendFileSync("keywords.txt", word + "\n");
});

//calculating TF vectors for all the document
let TF = new Array(N); //making TF matrix for all documents(length N)
for (let i = 0; i < N; i++) {
  TF[i] = new Array(W).fill(0); //making a new array of lenth same as no of keywords to make vector representation 
  //for each document initailly making all zero value for vector 
  let map = new Map(); //initialising a map
  docKeywords[i].forEach((key) => {
    return map.set(key, 0);
  });

  //updating the map to get frequency of each keyword in dockeywords[i] 
  docKeywords[i].forEach((key) => {
    let cnt = map.get(key);
    cnt++;
    return map.set(key, cnt);
  });

  //for every keyword in dockeywords[i] i get the index of that keyword from keywords array 
  // and set the value of TF[i][id] as freq of key/ len of dockeywords[i]
  docKeywords[i].forEach((key) => {
    const id = keywords.indexOf(key);
    if (id !== -1) {
      // TF[i][id] = map.get(key) / docKeywords[i].length;
      TF[i][id] = map.get(key);
    }
  });
}

//storing non zero TF components of the documents where i is document no and j is the keyword index
for (let i = 0; i < N; i++) {
  for (let j = 0; j < W; j++) {
    if (TF[i][j] != 0)
      fs.appendFileSync("TF.txt", i + " " + j + " " + TF[i][j] + "\n");
  }
}


//Calculating IDF values of all keywords
let IDF = new Array(W);
for (let i = 0; i < W; i++) { //iterating through all keywords 
  let cnt = 0;
  for (let j = 0; j < N; j++) { 
    if (TF[j][i]) {  //checking for all documents whether that key word exit or not as j denotes the keyword index and finding
      // the total count of such documents
      cnt++;
    }
  }
  if (cnt) IDF[i] = Math.log((N - cnt + 0.5) / (cnt + 0.5) + 1) + 1; // if any doc has keyword then calculate IDF
}

//append IDF of all keywords in IDF.txt
IDF.forEach((word) => {
  fs.appendFileSync("IDF.txt", word + "\n");
});

