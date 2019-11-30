const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertOneUpdateOneDeleteOneTransaction';

const insertOneUpdateOneDeleteOneTransaction = async (client, db, i) => {
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
  await db.collection('users1').insertOne(currentUser, opts);
  await db.collection('users2').updateOne({ id: i }, { $inc: { rate: 1 } }, opts);
  await db.collection('users3').deleteOne({ id: i }, opts);
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: insertOneUpdateOneDeleteOneTransaction, name: scriptName };
