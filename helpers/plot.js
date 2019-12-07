const fs = require('fs');
const util = require('util');
const { calculate, savePlot, saveJson } = require('./calculate');

const readFileAsync = util.promisify(fs.readFile);

const run = async (path, fileName, i) => {
  const fileT = await readFileAsync(`../results/${i}/${path}/${fileName}`);
  const file = await readFileAsync(`../results/${i}/${path}/${fileName.replace('Transaction', '')}`);
  const resultsT = JSON.parse(fileT);
  const results = JSON.parse(file);
  const title = fileName.replace('Transaction', '').replace('Results', '').replace('.json', '');
  const html = await calculate(results.results.slice(100, 200), resultsT.results.slice(100, 200), title);
  await savePlot(`../results-plots/${i}/${path}`, fileName.replace('Transaction', '').replace('json', 'html'), html);
  await saveJson(results.results.slice(100, 200), resultsT.results.slice(100, 200), title);
};

module.exports = run;
