const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertOne';

const insertOne = async (client, db, i) => {
  const currentUser = { ...users[i] };
  const before = microseconds.now();
  await db.collection('users').insertOne(currentUser);
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertOne, name: scriptName };
