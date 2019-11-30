const microseconds = require('microseconds');
const users = require('../../helpers/users');

const scriptName = 'insertOneUpdateOneDeleteOneFindOne';

const insertOneUpdateOneDeleteOneFindOne = async (client, db, i) => {
  const currentUser = { ...users[i] };
  const before = microseconds.now();
  await db.collection('users1').insertOne(currentUser);
  await db.collection('users2').updateOne({ id: i }, { $inc: { rate: 1 } });
  await db.collection('users3').deleteOne({ id: i });
  const user1 = await db.collection('users1').findOne({ id: 1 });
  const user2 = await db.collection('users2').findOne({ id: i });
  const user3 = await db.collection('users3').findOne({ id: i });
  const after = before + microseconds.since(before);
  return user1 && user2 && user2.rate === 2 && !user3 ? after - before : 0;
};

module.exports = { op: insertOneUpdateOneDeleteOneFindOne, name: scriptName };
