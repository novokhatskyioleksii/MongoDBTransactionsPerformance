const fs = require('fs');
const util = require('util');
const Plot = require('@stdlib/plot/ctor');
const ttest = require('ttest');

const mkdirAsync = util.promisify(fs.mkdir);
const statAsync = util.promisify(fs.stat);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Arithmetic mean
const getMean = (data) => data.reduce((a, b) => Number(a) + Number(b)) / data.length;

// Standard deviation
let getSD = (data) => {
  const m = getMean(data);
  return Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - m, 2), 0) / (data.length - 1));
};

const filterOutliers = (someArray) => {
  // Copy the values, rather than operating on references to existing values
  const values = someArray.concat();

  // Then sort
  values.sort((a, b) => a - b);

  /* Then find a generous IQR. This is generous because if (values.length / 4)
   * is not an int, then really you should average the two elements on either
   * side to find q1.
   */
  const q1 = values[Math.floor((values.length / 4))];
  // Likewise for q3.
  const q3 = values[Math.ceil((values.length * (3 / 4)))];
  const iqr = q3 - q1;

  // Then find min and max values
  const maxValue = q3 + iqr * 1.5;
  const minValue = q1 - iqr * 1.5;

  // Then filter anything beyond or beneath these values.
  return values.filter((x) => (x <= maxValue) && (x >= minValue));
};

const calculate = async (results, resultsT, path, filename) => {
  const filteredResult = filterOutliers(results.map((result) => Object.values(result)[0]));
  const filteredResultT = filterOutliers(resultsT.map((result) => Object.values(result)[0]));

  const t = filteredResult.concat(new Array(results.length - filteredResult.length).fill(null));
  const tt = filteredResultT.concat(new Array(resultsT.length - filteredResultT.length).fill(null));

  const x = [t.map((result, index) => index), tt.map((result, index) => index)];
  const y = [t, tt];

  const plot = new Plot();

  const title = filename.replace('Transaction', '').replace('Results', '').replace('.json', '');

  plot.x = x;
  plot.y = y;
  plot.width = 1200;
  plot.lineStyle = ':';
  plot.lineOpacity = 1;
  plot.lineWidth = 3;
  plot.colors = ['teal', '#ffbf00'];
  plot.title = title;
  plot.yRug = true;
  plot.yMin = 0;
  plot.yRugOrient = 'left';
  plot.xRugOpacity = 1;
  plot.yRugOpacity = 1;
  plot.yRugSize = 10;
  plot.xNumTicks = 10;
  plot.yNumTicks = 10;
  plot.xLabel = 'Number of requests';
  plot.yLabel = 'microseconds';

  const vtree = plot.render('html');

  const nullHypothesis = ttest(filteredResult, filteredResultT).valid();

  const isTWin = getMean(filteredResultT) < getMean(filteredResult);

  const success = `
<h4>Is statistically significant: <span style="color: green; text-transform: uppercase">${!nullHypothesis}</span></h4>
<h4 style="color: ${isTWin ? '#ffbf00' : 'teal'}; text-transform: uppercase">${isTWin ? 'Transactions wins' : 'No transactions wins'}</h4>
`;
  const fail = `
<h4>Is statistically significant: <span style="color: red; text-transform: uppercase">${!nullHypothesis}</span></h4>
<h4 style="text-transform: uppercase">No winners</h4>
`;

  const final = !nullHypothesis ? success : fail;

  await mkdirAsync(`../results-plots/${path}`, { recursive: true });
  await writeFileAsync(`../results-plots/${path}/${filename.replace('Transaction', '').replace('json', 'html')}`, vtree
      + `<h3>Mean with standard deviation</h3>
<h4 style="color: teal">(No transaction): ${getMean(filteredResult)} &#177; ${getSD(filteredResult)},</h4>
<h4 style="color: #ffbf00">(Transaction): ${getMean(filteredResultT)} &#177; ${getSD(filteredResultT)}</h4>`
      + final);
  await mkdirAsync(`../results-calc`, { recursive: true });
  try {
    await statAsync('../results-calc/results.json');
  } catch (e) {
    await writeFileAsync('../results-calc/results.json', JSON.stringify({ [title]: { t: [], n: [] } }, null, 2));
  }
  const file = await readFileAsync('../results-calc/results.json');
  const resultsCalc = JSON.parse(file);
  if (!resultsCalc[title]) resultsCalc[title] = { t: [], n: [] };
  resultsCalc[title].t.push(getMean(filteredResultT));
  resultsCalc[title].n.push(getMean(filteredResult));
  await writeFileAsync('../results-calc/results.json', JSON.stringify(resultsCalc, null, 2));
};

module.exports = calculate;
