const ttest = require('ttest');
const fs = require('fs');
const util = require('util');

const mkdirAsync = util.promisify(fs.mkdir);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const { filterOutliers, calculate, savePlot, makeHtml } = require('./calculate');

const result = async () => {
  const file = await readFileAsync('../results-calc/results.json');
  const results = JSON.parse(file);
  let htmlFinal = '';
  for (let title of Object.keys(results)) {
    const html = await calculate(results[title].n, results[title].t, title);
    await savePlot(`../results-final/${title}`, 'results.html', html);
    htmlFinal += makeHtml(filterOutliers(results[title].n), filterOutliers(results[title].t), title);
  }
  await mkdirAsync('../results-final', { recursive: true });
  await writeFileAsync('../results-final/results.html', htmlFinal);
};

module.exports = result;
