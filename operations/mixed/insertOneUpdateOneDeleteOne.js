const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertOneUpdateOneDeleteOne';

const insertOneUpdateOneDeleteOne = async (client, db, i) => {
  const currentUser = { ...users[i] };
  const before = microseconds.now();
  await db.collection('users1').insertOne(currentUser);
  await db.collection('users2').updateOne({ id: i }, { $inc: { rate: 1 } });
  await db.collection('users3').deleteOne({ id: i });
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertOneUpdateOneDeleteOne, name: scriptName };
