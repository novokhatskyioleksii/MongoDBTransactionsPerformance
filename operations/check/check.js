const microseconds = require('microseconds');

const scriptName = 'check';

const check = async (client, db, i) => {
  const before = microseconds.now();
  db.collection('users').find({}).toArray();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: check, name: scriptName };
