const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertManyUpdateManyDeleteManyFindTransaction';

const insertManyUpdateManyDeleteManyFindTransaction = async (client, db, i) => {
  const currentUsers = users.filter((user, index) => index >= i * 300 && index < i * 300 + 300);
  const filter = { $and: [{ id: { $gte: i * 300 } }, { id: { $lt: i * 300 + 300 } }] };
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' }
  };
  const before = microseconds.now();
  const session = client.startSession();
  session.startTransaction(transactionOptions);
  const opts = { session };
  await db.collection('users1').insertMany(currentUsers, opts);
  await db.collection('users2').updateMany(filter, { $inc: { rate: 1 } }, opts);
  await db.collection('users3').deleteMany(filter, opts);
  const users1 = await db.collection('users1').find(filter, opts).toArray();
  const users2 = await db.collection('users2').find(filter, opts).toArray();
  const users3 = await db.collection('users3').find(filter, opts).toArray();
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return users1.length === 300 && users2.length === 300 && users2.every((user) => user.rate === 2) && users3.length === 0 ? after - before : 0;
};

module.exports = { op: insertManyUpdateManyDeleteManyFindTransaction, name: scriptName };
