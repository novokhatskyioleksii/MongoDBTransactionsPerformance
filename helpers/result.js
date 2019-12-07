const fs = require('fs');
const util = require('util');

const mkdirAsync = util.promisify(fs.mkdir);
const statAsync = util.promisify(fs.stat);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const { filterOutliers, calculate, savePlot, makeHtml } = require('./calculate');

const operations = [
  'check',
  'insertOne',
  'insertMany',
  'updateOne',
  'updateMany',
  'deleteOne',
  'deleteMany',
  'findOne',
  'find',
  'insertOneUpdateOneDeleteOne',
  'insertManyUpdateManyDeleteMany',
  'insertOneUpdateOneDeleteOneFindOne',
  'insertManyUpdateManyDeleteManyFind',
];

const result = async () => {
  let htmlFinal = '';
  for (let title of operations) {
    try {
      await statAsync(`../results-calc/${title}/results.json`);
      const file = await readFileAsync(`../results-calc/${title}/results.json`);
      const results = JSON.parse(file);
      const html = await calculate(results.n, results.t, title);
      await savePlot(`../results-final/${title}`, 'results.html', html);
      htmlFinal += makeHtml(filterOutliers(results.n), filterOutliers(results.t), title);
    } catch (e) {}
  }
  await mkdirAsync('../results-final', { recursive: true });
  await writeFileAsync('../results-final/results.html', htmlFinal);
};

module.exports = result;
