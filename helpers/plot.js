const fs = require('fs');
const util = require('util');
const { calculate } = require('./calculate');

const readFileAsync = util.promisify(fs.readFile);

const run = async (path, fileName, i) => {
  const fileT = await readFileAsync(`../results/${i}/${path}/${fileName}`);
  const file = await readFileAsync(`../results/${i}/${path}/${fileName.replace('Transaction', '')}`);
  const resultsT = JSON.parse(fileT);
  const results = JSON.parse(file);
  await calculate(results.results.slice(100, 200), resultsT.results.slice(100, 200), path, fileName, i);
};

module.exports = run;
