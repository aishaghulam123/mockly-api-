const { buildSeedData } = require("./seedData");

async function seedIfEmpty(db, { reset = false } = {}) {
  const seedData = buildSeedData();
  const summary = {};

  for (const [name, records] of Object.entries(seedData)) {
    const collection = db.collection(name);

    if (reset) await collection.deleteMany({});
    await collection.createIndex({ id: 1 }, { unique: true });

    const existing = await collection.countDocuments();
    if (existing === 0) {
      await collection.insertMany(records.map((record) => ({ ...record })));
      summary[name] = `inserted ${records.length}`;
      console.log(`Seeded ${name}: ${records.length} records`);
    } else {
      summary[name] = `kept ${existing}`;
    }
  }
  return summary;
}

module.exports = { seedIfEmpty };

if (require.main === module) {
  require("dotenv").config();
  const { MongoClient } = require("mongodb");

  (async () => {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    try {
      await client.connect();
      const db = client.db(process.env.DB_NAME || "mockly");
      const summary = await seedIfEmpty(db, { reset: process.argv.includes("--reset") });
      console.log("Done:", summary);
    } catch (error) {
      console.error("Seeding failed:", error.message);
      process.exitCode = 1;
    } finally {
      await client.close();
    }
  })();
}
