const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertOneUpdateOneDeleteOneFindOneTransaction';

const insertOneUpdateOneDeleteOneFindOneTransaction = async (client, db, i) => {
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
  const user1 = await db.collection('users1').findOne({ id: 1 }, opts);
  const user2 = await db.collection('users2').findOne({ id: i }, opts);
  const user3 = await db.collection('users3').findOne({ id: i }, opts);
  await session.commitTransaction();
  session.endSession();
  const after = before + microseconds.since(before);
  return user1 && user2 && user2.rate === 2 && !user3 ? after - before : 0;
};

module.exports = { op: insertOneUpdateOneDeleteOneFindOneTransaction, name: scriptName };
