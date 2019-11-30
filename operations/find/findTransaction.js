const microseconds = require('microseconds');

const scriptName = 'findTransaction';

const findTransaction = async (client, db, i) => {
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
  await db.collection('users').find(filter, opts).toArray();
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: findTransaction, name: scriptName };
