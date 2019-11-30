const fs = require('fs');
const util = require('util');

const mkdirAsync = util.promisify(fs.mkdir);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const { getMean, filterOutliers } = require('./calculate');

const result = async () => {
  const file = await readFileAsync('../results-calc/results.json');
  const results = JSON.parse(file);
  let html = '';
  Object.keys(results).forEach((key) => {
    const nResult = getMean(filterOutliers(results[key].n));
    const tResult = getMean(filterOutliers(results[key].t));
    const isTWin = tResult < nResult;
    const faster = `${(100 - (tResult * 100 / nResult)).toFixed(0)} %`;
    const slower = `${((tResult * 100 / nResult) - 100).toFixed(0)} %`;
    html += `
      <h2>${key}:</h2>
      <h3 style="color: teal">No transaction: ${nResult.toFixed(2)} microseconds</h3>
      <h3 style="color: #ffbf00">Transaction: ${tResult.toFixed(2)} microseconds</h3>
      <h3>${isTWin ? 'Transaction is <span style="color: green">faster</span>: ' : 'Transaction is <span style="color: red">slower</span>: '} ${isTWin ? faster : slower}</h3>
    `;
  });
  await mkdirAsync('../results-final', { recursive: true });
  await writeFileAsync('../results-final/results.html', html);
};

module.exports = result;
