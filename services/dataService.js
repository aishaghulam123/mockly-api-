const { connectDb } = require("../config/db");

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;
const HIDE_MONGO_ID = { projection: { _id: 0 } };

function parseWholeNumber(value) {
  if (typeof value !== "string" || !/^\d+$/.test(value.trim())) return null;
  const number = Number(value.trim());
  return Number.isSafeInteger(number) ? number : null;
}

function parsePagination(query) {
  const limit = parseWholeNumber(query.limit);
  const skip = parseWholeNumber(query.skip);
  return {
    limit: limit !== null && limit >= 1 ? Math.min(limit, MAX_LIMIT) : DEFAULT_LIMIT,
    skip: skip !== null ? skip : 0
  };
}

async function getList(categoryKey, query) {
  const db = await connectDb();
  const collection = db.collection(categoryKey);
  const { limit, skip } = parsePagination(query);

  const [records, total] = await Promise.all([
    collection.find({}, HIDE_MONGO_ID).sort({ id: 1 }).skip(skip).limit(limit).toArray(),
    collection.countDocuments()
  ]);

  return { [categoryKey]: records, total, skip, limit };
}

async function getOne(categoryKey, id) {
  const db = await connectDb();
  return db.collection(categoryKey).findOne({ id }, HIDE_MONGO_ID);
}

async function getTotals(categories) {
  const db = await connectDb();
  const entries = await Promise.all(
    categories.map(async (category) => [category.key, await db.collection(category.key).countDocuments()])
  );
  return Object.fromEntries(entries);
}

module.exports = { parseWholeNumber, parsePagination, getList, getOne, getTotals, MAX_LIMIT, DEFAULT_LIMIT };
