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
  return runOp(check, client, db, 'check', checkName, i);
};

const checkTransactionRun = async (client, db, i) => {
  await runOp(checkTransaction, client, db, 'check', checkTransactionName, i);
  await plot('check', `${checkTransactionName}Results.json`, i);
  await db.collection('users').deleteMany({});
};

const insertOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertOne, client, db, 'insert', insertOneName, i);
  await db.collection('users').deleteMany({});
};

const insertOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertOneTransaction, client, db, 'insert', insertOneTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('insert', `${insertOneTransactionName}Results.json`, i);
};

const insertManyRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertMany, client, db, 'insert', insertManyName, i);
  await db.collection('users').deleteMany({});
};

const insertManyTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await runOp(insertManyTransaction, client, db, 'insert', insertManyTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('insert', `${insertManyTransactionName}Results.json`, i);
};

const updateOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertOne(users[0]);
  await runOp(updateOne, client, db, 'update', updateOneName, i);
  await db.collection('users').deleteMany({});
};

const updateOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertOne(users[0]);
  await runOp(updateOneTransaction, client, db, 'update', updateOneTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('update', `${updateOneTransactionName}Results.json`, i);
};

const updateManyRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(updateMany, client, db, 'update', updateManyName, i);
  await db.collection('users').deleteMany({});
};

const updateManyTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(updateManyTransaction, client, db, 'update', updateManyTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('update', `${updateManyTransactionName}Results.json`, i);
};

const deleteOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteOne, client, db, 'delete', deleteOneName, i);
  await db.collection('users').deleteMany({});
};

const deleteOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteOneTransaction, client, db, 'delete', deleteOneTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('delete', `${deleteOneTransactionName}Results.json`, i);
};

const deleteManyRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteMany, client, db, 'delete', deleteManyName, i);
  await db.collection('users').deleteMany({});
};

const deleteManyTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(deleteManyTransaction, client, db, 'delete', deleteManyTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('delete', `${deleteManyTransactionName}Results.json`, i);
};

const findOneRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(findOne, client, db, 'find', findOneName, i);
  await db.collection('users').deleteMany({});
};

const findOneTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(findOneTransaction, client, db, 'find', findOneTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('find', `${findOneTransactionName}Results.json`, i);
};

const findRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(find, client, db, 'find', findName, i);
  await db.collection('users').deleteMany({});
};

const findTransactionRun = async (client, db, i) => {
  await db.collection('users').deleteMany({});
  await db.collection('users').insertMany(users);
  await runOp(findTransaction, client, db, 'find', findTransactionName, i);
  await db.collection('users').deleteMany({});
  await plot('find', `${findTransactionName}Results.json`, i);
};

const insertOneUpdateOneDeleteOneRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOne, client, db, 'mixed', insertOneUpdateOneDeleteOneName, i);
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
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertOneUpdateOneDeleteOneTransactionName}Results.json`, i);
};

const insertManyUpdateManyDeleteManyRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteMany, client, db, 'mixed', insertManyUpdateManyDeleteManyName, i);
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
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertManyUpdateManyDeleteManyTransactionName}Results.json`, i);
};

const insertOneUpdateOneDeleteOneFindOneRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneFindOne, client, db, 'mixed', insertOneUpdateOneDeleteOneFindOneName, i);
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
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertOneUpdateOneDeleteOneFindOneTransactionName}Results.json`, i);
};

const insertManyUpdateManyDeleteManyFindRun = async (client, db, i) => {
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyFind, client, db, 'mixed', insertManyUpdateManyDeleteManyFindName, i);
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
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertManyUpdateManyDeleteManyFindTransactionName}Results.json`, i);
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
        {
          n: insertOneRun,
          t: insertOneTransactionRun,
        },
        {
          n: insertManyRun,
          t: insertManyTransactionRun,
        },
        {
          n: updateOneRun,
          t: updateOneTransactionRun,
        },
        {
          n: updateManyRun,
          t: updateManyTransactionRun,
        },
        {
          n: deleteOneRun,
          t: deleteOneTransactionRun,
        },
        {
          n: deleteManyRun,
          t: deleteManyTransactionRun,
        },
        {
          n: findOneRun,
          t: findOneTransactionRun,
        },
        {
          n: findRun,
          t: findTransactionRun,
        },
        {
          n: insertOneUpdateOneDeleteOneRun,
          t: insertOneUpdateOneDeleteOneTransactionRun,
        },
        {
          n: insertManyUpdateManyDeleteManyRun,
          t: insertManyUpdateManyDeleteManyTransactionRun,
        },
        {
          n: insertOneUpdateOneDeleteOneFindOneRun,
          t: insertOneUpdateOneDeleteOneFindOneTransactionRun,
        },
        {
          n: insertManyUpdateManyDeleteManyFindRun,
          t: insertManyUpdateManyDeleteManyFindTransactionRun,
        }
      ];

      const shuffleOperations = i > 0 ? shuffle(operations) : operations;

      for (let operation of shuffleOperations) {
        await operation.n(client, db, i + 1);
        await operation.t(client, db, i + 1);
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
