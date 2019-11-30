const microseconds = require('microseconds');

const scriptName = 'deleteOne';

const deleteOne = async (client, db, i) => {
  const before = microseconds.now();
  await db.collection('users').deleteOne({ id: i });
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: deleteOne, name: scriptName };
