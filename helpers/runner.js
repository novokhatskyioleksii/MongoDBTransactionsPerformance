const fs = require('fs');
const util = require('util');
const Bar = require('progress-barjs');

const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);

const { iterations300 } = require('./iterations');

// const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const runIterations = async (op, client, db, name) => {
  let bar = Bar({
    label: `${name.padEnd(50)}`,
    total: iterations300.length,
    show: {
      active:{
        date:true,
      },
      bar: {
        color:'\x1b[0;31m',
        length: 50,
        completed: '.',
        incompleted: '',
      },
      percent:{ color:'\x1b[1;37m' },
      count:{ color:'\x1b[0;36m' },
      time:{ color:'\x1b[0;34m' },
    },
  });
  const results = [];
  for (let i of iterations300) {
    // await timeout(50);
    const result = await op(client, db, i);
    results.push(result);
    bar.tick(i + 1);
  }
  return results;
};

const runOp = async (op, client, db, path, name, i) => {
  const results = await runIterations(op, client, db, name);
  await mkdirAsync(`../results/${i}/${path}`, { recursive: true });
  await writeFileAsync(`../results/${i}/${path}/${name}.json`, JSON.stringify({ results }, null, 2));
};

module.exports = runOp;