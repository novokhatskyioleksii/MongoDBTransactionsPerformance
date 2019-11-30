const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertManyTransaction';

const insertManyTransaction = async (client, db, i) => {
  const currentUsers = users.filter((user, index) => index >= i * 300 && index < i * 300 + 300);
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' }
  };
  const before = microseconds.now();
  const session = client.startSession();
  session.startTransaction(transactionOptions);
  const opts = { session };
  await db.collection('users').insertMany(currentUsers, opts);
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertManyTransaction, name: scriptName };
