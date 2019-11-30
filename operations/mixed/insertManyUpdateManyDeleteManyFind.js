const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertManyUpdateManyDeleteManyFind';

const insertManyUpdateManyDeleteManyFind = async (client, db, i) => {
  const currentUsers = users.filter((user, index) => index >= i * 300 && index < i * 300 + 300);
  const filter = { $and: [{ id: { $gte: i * 300 } }, { id: { $lt: i * 300 + 300 } }] };
  const before = microseconds.now();
  await db.collection('users1').insertMany(currentUsers);
  await db.collection('users2').updateMany(filter, { $inc: { rate: 1 } });
  await db.collection('users3').deleteMany(filter);
  const users1 = await db.collection('users1').find(filter).toArray();
  const users2 = await db.collection('users2').find(filter).toArray();
  const users3 = await db.collection('users3').find(filter).toArray();
  const after = before + microseconds.since(before);
  return users1.length === 300 && users2.length === 300 && users2.every((user) => user.rate === 2) && users3.length === 0 ? after - before : 0;
};

module.exports = { op: insertManyUpdateManyDeleteManyFind, name: scriptName };
