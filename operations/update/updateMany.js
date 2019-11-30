const microseconds = require('microseconds');

const scriptName = 'updateMany';

const updateMany = async (client, db, i) => {
  const filter = { $and: [{ id: { $gte: i * 300 } }, { id: { $lt: i * 300 + 300 } }] };
  const before = microseconds.now();
  await db.collection('users').updateMany(filter, { $inc: { rate: 1 } });
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: updateMany, name: scriptName };