import { MongoClient } from 'mongodb';

const URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/';

let client: MongoClient;

async function createConnection() {
  client = new MongoClient(URL);
  await client.connect();
  return 0;
}

async function getConnection(streamId: string) {
  if (!await checkLife(streamId)) {
    throw Error ('your are sus')
  }
  return client.db('share-on').collection(streamId)
}

async function checkLife(id: string): Promise<boolean> {
  if (!client) {
    await createConnection()
  }
  return (await client.db('share-on')
  .listCollections({name: id})
  .toArray()).length > 0;
}

export { getConnection, checkLife }