const mongodb = require('mongodb');
const MongoMemoryReplSet = require('mongodb-memory-server').MongoMemoryReplSet;

const fs = require('fs');
const util = require('util');

const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);

const replSet = new MongoMemoryReplSet({
  debug: false,
  replSet: { storageEngine: 'wiredTiger' },
});

const MongoClient = mongodb.MongoClient;
let client;
let db;

const users = [];
for (let i = 0; i < 1000; i++) {
  users.push({ id: i, user: { roles: [], profile: {} }, rate: 1 });
}

const numberOfUsers = 1001;

const manyUsers = [];
for (let i = 0; i < numberOfUsers; i++) {
  manyUsers.push({ id: i, user: { roles: [], profile: {} }, rate: 1 });
}

const createMongoInstance = async () => {
  await replSet.waitUntilRunning();
  const connectionString = await replSet.getConnectionString();
  const dbName = await replSet.getDbName();
  client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  await db.createCollection('usersInserted');
  await db.createCollection('usersUpdated');
  await db.createCollection('usersDeleted');
  return db;
};

const fun = async () => {
  try {
    await createMongoInstance();
    await db.collection('usersInserted').insertMany(manyUsers.filter((user) => user.id >= 1000));
    await db.collection('usersUpdated').insertMany(manyUsers);
    await db.collection('usersDeleted').insertMany(manyUsers);
    const filter = { $and: [{ id: { $gte: 0 } }, { id: { $lt: 1000 } }] };
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    };
    const session = client.startSession();
    session.startTransaction(transactionOptions);
    const opts = { session };
    await db.collection('usersInserted').insertMany(users, opts);
    await db.collection('usersUpdated').updateMany(filter, { $inc: { rate: 1 } }, opts);
    await db.collection('usersDeleted').deleteMany(filter, opts);
    const results = await Promise.all([
      // db.collection('usersInserted').find(filter).toArray(),
      // db.collection('usersUpdated').find(filter).toArray(),
      // db.collection('usersDeleted').find(filter).toArray(),
      session.commitTransaction(),
    ]);
    session.endSession();

    await mkdirAsync(`./results-fun/${numberOfUsers}`, { recursive: true });
    // await writeFileAsync(`./results-fun/${numberOfUsers}/usersInserted.json`, JSON.stringify({
    //   inserted: results[0].length,
    //   notInserted: 1000 - results[0].length,
    // }, null, 2));
    // await writeFileAsync(`./results-fun/${numberOfUsers}/usersUpdated.json`, JSON.stringify({
    //   updated: results[0].filter((user) => user.rate === 2).length,
    //   notUpdated: results[0].filter((user) => user.rate === 1).length,
    // }, null, 2));
    // await writeFileAsync(`./results-fun/${numberOfUsers}/usersDeleted.json`, JSON.stringify({
    //   deleted: 1000 - results[0].length,
    //   notDeleted: results[0].length,
    // }, null, 2));

    await db.collection('usersInserted').drop();
    await db.collection('usersUpdated').drop();
    await db.collection('usersDeleted').drop();
    await client.close();
    await replSet.stop();
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

fun();
