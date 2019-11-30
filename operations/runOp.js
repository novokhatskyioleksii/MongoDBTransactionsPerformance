const createMongoInstance = require('../db/db');
const users = require('../helpers/users');
const runOp = require('../helpers/runner');
const plot = require('../plot/plot');

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

const checkRun = async (client, db) => {
  return runOp(check, client, db, 'check', checkName);
};

const checkTransactionRun = async (client, db) => {
  await runOp(checkTransaction, client, db, 'check', checkTransactionName);
  await plot('check', `${checkTransactionName}Results.json`);
};

const insertOneRun = async (client, db) => {
  await runOp(insertOne, client, db, 'insert', insertOneName);
  await db.collection('users').deleteMany({});
};

const insertOneTransactionRun = async (client, db) => {
  await runOp(insertOneTransaction, client, db, 'insert', insertOneTransactionName);
  await db.collection('users').deleteMany({});
  await plot('insert', `${insertOneTransactionName}Results.json`);
};

const insertManyRun = async (client, db) => {
  await runOp(insertMany, client, db, 'insert', insertManyName);
  await db.collection('users').deleteMany({});
};

const insertManyTransactionRun = async (client, db) => {
  await runOp(insertManyTransaction, client, db, 'insert', insertManyTransactionName);
  await db.collection('users').deleteMany({});
  await plot('insert', `${insertManyTransactionName}Results.json`);
};

const updateOneRun = async (client, db) => {
  await db.collection('users').insertOne(users[0]);
  await runOp(updateOne, client, db, 'update', updateOneName);
  await db.collection('users').deleteMany({});
};

const updateOneTransactionRun = async (client, db) => {
  await db.collection('users').insertOne(users[0]);
  await runOp(updateOneTransaction, client, db, 'update', updateOneTransactionName);
  await db.collection('users').deleteMany({});
  await plot('update', `${updateOneTransactionName}Results.json`);
};

const updateManyRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(updateMany, client, db, 'update', updateManyName);
  await db.collection('users').deleteMany({});
};

const updateManyTransactionRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(updateManyTransaction, client, db, 'update', updateManyTransactionName);
  await db.collection('users').deleteMany({});
  await plot('update', `${updateManyTransactionName}Results.json`);
};

const deleteOneRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(deleteOne, client, db, 'delete', deleteOneName);
  await db.collection('users').deleteMany({});
};

const deleteOneTransactionRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(deleteOneTransaction, client, db, 'delete', deleteOneTransactionName);
  await db.collection('users').deleteMany({});
  await plot('delete', `${deleteOneTransactionName}Results.json`);
};

const deleteManyRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(deleteMany, client, db, 'delete', deleteManyName);
  await db.collection('users').deleteMany({});
};

const deleteManyTransactionRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(deleteManyTransaction, client, db, 'delete', deleteManyTransactionName);
  await db.collection('users').deleteMany({});
  await plot('delete', `${deleteManyTransactionName}Results.json`);
};

const findOneRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(findOne, client, db, 'find', findOneName);
  await db.collection('users').deleteMany({});
};

const findOneTransactionRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(findOneTransaction, client, db, 'find', findOneTransactionName);
  await db.collection('users').deleteMany({});
  await plot('find', `${findOneTransactionName}Results.json`);
};

const findRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(find, client, db, 'find', findName);
  await db.collection('users').deleteMany({});
};

const findTransactionRun = async (client, db) => {
  await db.collection('users').insertMany(users);
  await runOp(findTransaction, client, db, 'find', findTransactionName);
  await db.collection('users').deleteMany({});
  await plot('find', `${findTransactionName}Results.json`);
};

const insertOneUpdateOneDeleteOneRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOne, client, db, 'mixed', insertOneUpdateOneDeleteOneName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertOneUpdateOneDeleteOneTransactionRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneTransaction, client, db, 'mixed', insertOneUpdateOneDeleteOneTransactionName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertOneUpdateOneDeleteOneTransactionName}Results.json`);
};

const insertManyUpdateManyDeleteManyRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteMany, client, db, 'mixed', insertManyUpdateManyDeleteManyName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertManyUpdateManyDeleteManyTransactionRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyTransaction, client, db, 'mixed', insertManyUpdateManyDeleteManyTransactionName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertManyUpdateManyDeleteManyTransactionName}Results.json`);
};

const insertOneUpdateOneDeleteOneFindOneRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneFindOne, client, db, 'mixed', insertOneUpdateOneDeleteOneFindOneName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertOneUpdateOneDeleteOneFindOneTransactionRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertOneUpdateOneDeleteOneFindOneTransaction, client, db, 'mixed', insertOneUpdateOneDeleteOneFindOneTransactionName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertOneUpdateOneDeleteOneFindOneTransactionName}Results.json`);
};

const insertManyUpdateManyDeleteManyFindRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyFind, client, db, 'mixed', insertManyUpdateManyDeleteManyFindName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
};

const insertManyUpdateManyDeleteManyFindTransactionRun = async (client, db) => {
  await db.collection('users2').insertMany(users);
  await db.collection('users3').insertMany(users);
  await runOp(insertManyUpdateManyDeleteManyFindTransaction, client, db, 'mixed', insertManyUpdateManyDeleteManyFindTransactionName);
  await db.collection('users1').deleteMany({});
  await db.collection('users2').deleteMany({});
  await db.collection('users3').deleteMany({});
  await plot('mixed', `${insertManyUpdateManyDeleteManyFindTransactionName}Results.json`);
};

const run = async () => {
  try {
    const { client, db, replSet } = await createMongoInstance();
    await db.createCollection('users');
    await db.createCollection('users1');
    await db.createCollection('users2');
    await db.createCollection('users3');
    await db.collection('users').insertMany(users);

    await checkRun(client, db);
    await checkTransactionRun(client, db);

    await db.collection('users').deleteMany({});

    await insertOneRun(client, db);
    await insertOneTransactionRun(client, db);
    await insertManyRun(client, db);
    await insertManyTransactionRun(client, db);

    await updateOneRun(client, db);
    await updateOneTransactionRun(client, db);
    await updateManyRun(client, db);
    await updateManyTransactionRun(client, db);

    await deleteOneRun(client, db);
    await deleteOneTransactionRun(client, db);
    await deleteManyRun(client, db);
    await deleteManyTransactionRun(client, db);

    await findOneRun(client, db);
    await findOneTransactionRun(client, db);
    await findRun(client, db);
    await findTransactionRun(client, db);

    await insertOneUpdateOneDeleteOneRun(client, db);
    await insertOneUpdateOneDeleteOneTransactionRun(client, db);
    await insertManyUpdateManyDeleteManyRun(client, db);
    await insertManyUpdateManyDeleteManyTransactionRun(client, db);
    await insertOneUpdateOneDeleteOneFindOneRun(client, db);
    await insertOneUpdateOneDeleteOneFindOneTransactionRun(client, db);
    await insertManyUpdateManyDeleteManyFindRun(client, db);
    await insertManyUpdateManyDeleteManyFindTransactionRun(client, db);

    await db.collection('users').drop();
    await db.collection('users1').drop();
    await db.collection('users2').drop();
    await db.collection('users3').drop();
    await client.close();
    await replSet.stop();
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
