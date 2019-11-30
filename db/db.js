const mongodb = require('mongodb');
const MongoMemoryReplSet = require('mongodb-memory-server').MongoMemoryReplSet;

const replSet = new MongoMemoryReplSet({
  debug: false,
  replSet: { storageEngine: 'wiredTiger' },
});

const MongoClient = mongodb.MongoClient;

const createMongoInstance = async () => {
  await replSet.waitUntilRunning();
  const connectionString = await replSet.getConnectionString();
  const dbName = await replSet.getDbName();
  const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  return { client, db, replSet };
};

module.exports = createMongoInstance;
