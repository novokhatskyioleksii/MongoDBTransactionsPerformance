const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertMany';

const insertMany = async (client, db, i) => {
  const currentUsers = users.filter((user, index) => index >= i * 300 && index < i * 300 + 300);
  const before = microseconds.now();
  await db.collection('users').insertMany(currentUsers);
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertMany, name: scriptName };
