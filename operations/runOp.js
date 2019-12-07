const createMongoInstance = require('../db/db');
const users = require('../helpers/users');
const runOp = require('../helpers/runner');
const { shuffle } = require('../helpers/calculate');
const plot = require('../helpers/plot');
const result = require('../helpers/result');
const { iterations } = require('../helpers/iterations');

const { op: check, name: checkName } = require('./check/check');
const { op: checkTransaction, name: checkTransactionName } = require('./check/checkTransaction');

const { op: insertOne, name: insertOneName } = require('./insert/insertOne');
const { op: insertOneTransaction, name: insertOneTransactionName } = require('./insert/insertOneTransaction');
const { op: insertMany, name: insertManyName } = require('./insert/insertMany');
const { op: insertManyTransaction, name: insertManyTransactionName } = require('./insert/insertManyTransaction');

const { op: updateOne, name: updateOneName } = require('./update/updateOne');
const { op: updateOneTransaction, name: updateOneTransactionName } = require('./update/updateOneTransaction');
const { op: updateMany, name: updateManyName } = require('./update/updateMany');
const { op: updateManyTransaction, name: updateManyTransactionName } = require('./update/updateManyTransaction');

const { op: deleteOne, name: deleteOneName } = require('./delete/deleteOne');
const { op: deleteOneTransaction, name: deleteOneTransactionName } = require('./delete/deleteOneTransaction');
const { op: deleteMany, name: deleteManyName } = require('./delete/deleteMany');
const { op: deleteManyTransaction, name: deleteManyTransactionName } = require('./delete/deleteManyTransaction');

const { op: findOne, name: findOneName } = require('./find/findOne');
const { op: findOneTransaction, name: findOneTransactionName } = require('./find/findOneTransaction');
const { op: find, name: findName } = require('./find/find');
const { op: findTransaction, name: findTransactionName } = require('./find/findTransaction');

const { op: insertOneUpdateOneDeleteOne, name: insertOneUpdateOneDeleteOneName } = require('./mixed/insertOneUpdateOneDeleteOne');
const { op: insertOneUpdateOneDeleteOneTransaction, name: insertOneUpdateOneDeleteOneTransactionName } = require('./mixed/insertOneUpdateOneDeleteOneTransaction');
const { op: insertManyUpdateManyDeleteMany, name: insertManyUpdateManyDeleteManyName } = require('./mixed/insertManyUpdateManyDeleteMany');
const { op: insertManyUpdateManyDeleteManyTransaction, name: insertManyUpdateManyDeleteManyTransactionName } = require('./mixed/insertManyUpdateManyDeleteManyTransaction');
const { op: insertOneUpdateOneDeleteOneFindOne, name: insertOneUpdateOneDeleteOneFindOneName } = require('./mixed/insertOneUpdateOneDeleteOneFindOne');
const { op: insertOneUpdateOneDeleteOneFindOneTransaction, name: insertOneUpdateOneDeleteOneFindOneTransactionName } = require('./mixed/insertOneUpdateOneDeleteOneFindOneTransaction');
const { op: insertManyUpdateManyDeleteManyFind, name: insertManyUpdateManyDeleteManyFindName } = require('./mixed/insertManyUpdateManyDeleteManyFind');
const { op: insertManyUpdateManyDeleteManyFindTransaction, name: insertManyUpdateManyDeleteManyFindTransactionName } = require('./mixed/insertManyUpdateManyDeleteManyFindTransaction');

const checkRun = async (client, db, i) => {
  await runOp(check, client, db, 'check', checkName, i);
  return plot('check', checkName, i);
};

const checkTransactionRun = async (client, db, i) => {
  await runOp(checkTransaction, client, db, 'check', checkTransactionName, i);
  await plot('check', checkName, i);
  await db.collection('users').deleteMany({});
};

const insertOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertOne, client, db, 'insert', insertOneName, i);
  await plot('insert', insertOneName, i);
  await db.collection('users').deleteMany({});
};

const insertOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertOneTransaction, client, db, 'insert', insertOneTransactionName, i);
  await plot('insert', insertOneName, i);
  await db.collection('users').deleteMany({});
};

const insertManyRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertMany, client, db, 'insert', insertManyName, i);
  await plot('insert', insertManyName, i);
  await db.collection('users').deleteMany({});
};

const insertManyTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertManyTransaction, client, db, 'insert', insertManyTransactionName, i);
  await plot('insert', insertManyName, i);
  await db.collection('users').deleteMany({});
};

const updateOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertOne(users[0]);
  await runOp(updateOne, client, db, 'update', updateOneName, i);
  await plot('update', updateOneName, i);
  await db.collection('users').deleteMany({});
};

const updateOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertOne(users[0]);
  await runOp(updateOneTransaction, client, db, 'update', updateOneTransactionName, i);
  await plot('update', updateOneName, i);
  await db.collection('users').deleteMany({});
};

const updateManyRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(updateMany, client, db, 'update', updateManyName, i);
  await plot('update', updateManyName, i);
  await db.collection('users').deleteMany({});
};

const updateManyTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(updateManyTransaction, client, db, 'update', updateManyTransactionName, i);
  await plot('update', updateManyName, i);
  await db.collection('users').deleteMany({});
};

const deleteOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteOne, client, db, 'delete', deleteOneName, i);
  await plot('delete', deleteOneName, i);
  await db.collection('users').deleteMany({});
};

const deleteOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteOneTransaction, client, db, 'delete', deleteOneTransactionName, i);
  await plot('delete', deleteOneName, i);
  await db.collection('users').deleteMany({});
};

const deleteManyRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteMany, client, db, 'delete', deleteManyName, i);
  await plot('delete', deleteManyName, i);
  await db.collection('users').deleteMany({});
};

const deleteManyTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteManyTransaction, client, db, 'delete', deleteManyTransactionName, i);
  await plot('delete', deleteManyName, i);
  await db.collection('users').deleteMany({});
};

const findOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(findOne, client, db, 'find', findOneName, i);
  await plot('find', findOneName, i);
  await db.collection('users').deleteMany({});
};

const findOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(findOneTransaction, client, db, 'find', findOneTransactionName, i);
  await plot('find', findOneName, i);
  await db.collection('users').deleteMany({});
};

const findRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(find, client, db, 'find', findName, i);
  await plot('find', findName, i);
  await db.collection('users').deleteMany({});
};

const findTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(findTransaction, client, db, 'find', findTransactionName, i);
  await plot('find', findName, i);
  await db.collection('users').deleteMany({});
};

const insertOneUpdateOneDeleteOneRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOne, client, db, 'mixed', insertOneUpdateOneDeleteOneName, i);
  await plot('mixed', insertOneUpdateOneDeleteOneName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertOneUpdateOneDeleteOneTransactionRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneTransaction, client, db, 'mixed', insertOneUpdateOneDeleteOneTransactionName, i);
  await plot('mixed', insertOneUpdateOneDeleteOneName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertManyUpdateManyDeleteManyRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteMany, client, db, 'mixed', insertManyUpdateManyDeleteManyName, i);
  await plot('mixed', insertManyUpdateManyDeleteManyName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertManyUpdateManyDeleteManyTransactionRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyTransaction, client, db, 'mixed', insertManyUpdateManyDeleteManyTransactionName, i);
  await plot('mixed', insertManyUpdateManyDeleteManyName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertOneUpdateOneDeleteOneFindOneRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneFindOne, client, db, 'mixed', insertOneUpdateOneDeleteOneFindOneName, i);
  await plot('mixed', insertOneUpdateOneDeleteOneFindOneName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertOneUpdateOneDeleteOneFindOneTransactionRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneFindOneTransaction, client, db, 'mixed', insertOneUpdateOneDeleteOneFindOneTransactionName, i);
  await plot('mixed', insertOneUpdateOneDeleteOneFindOneName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertManyUpdateManyDeleteManyFindRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyFind, client, db, 'mixed', insertManyUpdateManyDeleteManyFindName, i);
  await plot('mixed', insertManyUpdateManyDeleteManyFindName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertManyUpdateManyDeleteManyFindTransactionRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyFindTransaction, client, db, 'mixed', insertManyUpdateManyDeleteManyFindTransactionName, i);
  await plot('mixed', insertManyUpdateManyDeleteManyFindName, i);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const run = async () => {
  try {
    const { client, db, replSet } = await createMongoInstance();

    for (let i of iterations) {
      console.log('Iteration #', i + 1);

      await db.createCollection('users');
      await db.createCollection('users1');
      await db.createCollection('users2');
      await db.createCollection('users3');
      await db.collection('users').insertMany(users);

      await checkRun(client, db, i + 1);
      await checkTransactionRun(client, db, i + 1);

      await db.collection('users').deleteMany({});

      const operations = [
        insertOneRun,
        insertOneTransactionRun,
        insertManyRun,
        insertManyTransactionRun,
        updateOneRun,
        updateOneTransactionRun,
        updateManyRun,
        updateManyTransactionRun,
        deleteOneRun,
        deleteOneTransactionRun,
        deleteManyRun,
        deleteManyTransactionRun,
        findOneRun,
        findOneTransactionRun,
        findRun,
        findTransactionRun,
        insertOneUpdateOneDeleteOneRun,
        insertOneUpdateOneDeleteOneTransactionRun,
        insertManyUpdateManyDeleteManyRun,
        insertManyUpdateManyDeleteManyTransactionRun,
        insertOneUpdateOneDeleteOneFindOneRun,
        insertOneUpdateOneDeleteOneFindOneTransactionRun,
        insertManyUpdateManyDeleteManyFindRun,
        insertManyUpdateManyDeleteManyFindTransactionRun,
      ];

      const shuffleOperations = i > 0 ? shuffle(operations) : operations;

      for (let operation of shuffleOperations) {
        await operation(client, db, i + 1);
      }

      await db.collection('users').drop();
      await db.collection('users1').drop();
      await db.collection('users2').drop();
      await db.collection('users3').drop();
    }

    await result();
    await client.close();
    await replSet.stop();
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
