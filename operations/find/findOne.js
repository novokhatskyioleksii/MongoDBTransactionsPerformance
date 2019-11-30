const microseconds = require('microseconds');

const scriptName = 'findOne';

const findOne = async (client, db, i) => {
  const before = microseconds.now();
  await db.collection('users').findOne({ id: i });
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: findOne, name: scriptName };
