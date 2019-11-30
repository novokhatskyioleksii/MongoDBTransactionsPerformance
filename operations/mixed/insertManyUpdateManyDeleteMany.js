const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertManyUpdateManyDeleteMany';

const insertManyUpdateManyDeleteMany = async (client, db, i) => {
  const currentUsers = users.filter((user, index) => index >= i * 300 && index < i * 300 + 300);
  const filter = { $and: [{ id: { $gte: i * 300 } }, { id: { $lt: i * 300 + 300 } }] };
  const before = microseconds.now();
  await db.collection('users1').insertMany(currentUsers);
  await db.collection('users2').updateMany(filter, { $inc: { rate: 1 } });
  await db.collection('users3').deleteMany(filter);
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertManyUpdateManyDeleteMany, name: scriptName };
