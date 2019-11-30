const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertManyUpdateManyDeleteManyTransaction';

const insertManyUpdateManyDeleteManyTransaction = async (client, db, i) => {
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
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertManyUpdateManyDeleteManyTransaction, name: scriptName };
