const microseconds = require('microseconds');

const scriptName = 'updateOne';

const updateOne = async (client, db, i) => {
  const before = microseconds.now();
  await db.collection('users').updateOne({ id: 1 }, { $inc: { rate: 1 } });
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: updateOne, name: scriptName };
