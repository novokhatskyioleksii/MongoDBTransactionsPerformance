const microseconds = require('microseconds');

const scriptName = 'findOneTransaction';

const findOneTransaction = async (client, db, i) => {
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' }
  };
  const before = microseconds.now();
  const session = client.startSession();
  session.startTransaction(transactionOptions);
  const opts = { session };
  await db.collection('users').findOne({ id: i }, opts);
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: findOneTransaction, name: scriptName };
