const microseconds = require('microseconds');

const scriptName = 'checkTransaction';

const checkTransaction = async (client, db, i) => {
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' }
  };
  const before = microseconds.now();
  const session = client.startSession();
  session.startTransaction(transactionOptions);
  const opts = { session };
  db.collection('users').find({}).toArray();
  session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return after - before;
};

module.exports = { op: checkTransaction, name: scriptName };
