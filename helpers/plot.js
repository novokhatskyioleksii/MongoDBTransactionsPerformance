const fs = require('fs');
const util = require('util');
const { calculate, savePlot, saveJson } = require('./calculate');

const statAsync = util.promisify(fs.stat);
const readFileAsync = util.promisify(fs.readFile);

const run = async (path, fileName, i) => {
  try {
    await statAsync(`../results/${i}/${path}/${fileName}.json`);
    await statAsync(`../results/${i}/${path}/${fileName}Transaction.json`);
    const file = await readFileAsync(`../results/${i}/${path}/${fileName}.json`);
    const fileT = await readFileAsync(`../results/${i}/${path}/${fileName}Transaction.json`);
    const results = JSON.parse(file);
    const resultsT = JSON.parse(fileT);
    const html = await calculate(results.results.slice(100, 200), resultsT.results.slice(100, 200), fileName);
    await savePlot(`../results-plots/${i}/${path}`, `${fileName}.html`, html);
    await saveJson(results.results.slice(100, 200), resultsT.results.slice(100, 200), fileName);
  } catch (e) {}
};

module.exports = run;
