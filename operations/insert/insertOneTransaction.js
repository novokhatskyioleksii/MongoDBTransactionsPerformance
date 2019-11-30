const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertOneTransaction';

const insertOneTransaction = async (client, db, i) => {
  const currentUser = { ...users[i] };
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' }
  };
  const before = microseconds.now();
  const session = client.startSession();
  session.startTransaction(transactionOptions);
  const opts = { session };
  await db.collection('users').insertOne(currentUser, opts);
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertOneTransaction, name: scriptName };
