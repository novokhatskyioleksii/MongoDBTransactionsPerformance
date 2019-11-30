const fs = require('fs');
const util = require('util');
const calculate = require('./calculate');

const readFileAsync = util.promisify(fs.readFile);

const run = async (path, fileName) => {
  const fileT = await readFileAsync(`../results/${path}/${fileName}`);
  const file = await readFileAsync(`../results/${path}/${fileName.replace('Transaction', '')}`);
  const resultsT = JSON.parse(fileT);
  const results = JSON.parse(file);
  await calculate(results.results.slice(100, 200), resultsT.results.slice(100, 200), path, fileName);
};

module.exports = run;
