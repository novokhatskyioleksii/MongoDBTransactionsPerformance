const microseconds = require('microseconds');

const scriptName = 'deleteMany';

const deleteMany = async (client, db, i) => {
  const filter = { $and: [{ id: { $gte: i * 300 } }, { id: { $lt: i * 300 + 300 } }] };
  const before = microseconds.now();
  await db.collection('users').deleteMany(filter);
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: deleteMany, name: scriptName };
