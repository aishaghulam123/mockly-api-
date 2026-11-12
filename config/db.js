const { MongoClient } = require("mongodb");
const { seedIfEmpty } = require("../data/seed");

const DEFAULT_URI = "mongodb://127.0.0.1:27017";

let dbPromise = null;

function connectDb() {
  if (dbPromise) return dbPromise;

  const uri = process.env.MONGODB_URI || DEFAULT_URI;
  const dbName = process.env.DB_NAME || "mockly";

  if (!process.env.MONGODB_URI) {
    console.warn(`MONGODB_URI is not set in .env, using ${DEFAULT_URI}`);
  }

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

  dbPromise = client
    .connect()
    .then(async () => {
      const db = client.db(dbName);
      await seedIfEmpty(db); 
      return db;
    })
    .catch((error) => {
      dbPromise = null; 
      client.close().catch(() => {});
      throw error;
    });

  return dbPromise;
}

module.exports = { connectDb };
