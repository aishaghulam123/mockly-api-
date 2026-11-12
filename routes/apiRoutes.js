const express = require("express");
const { categories } = require("../config/categories");
const { connectDb } = require("../config/db");
const { jsonViewer } = require("../middleware/jsonViewer");
const { parseWholeNumber, getList, getOne, getTotals } = require("../services/dataService");

const router = express.Router();

router.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

router.use(jsonViewer);

router.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({ message: "Database is not reachable right now. Please try again later." });
  }
});

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

router.get("/", async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/api`;
  const totals = await getTotals(categories);

  res.json({
    message: "Welcome to Mockly API",
    docs: `${req.protocol}://${req.get("host")}/docs`,
    endpoints: categories.map((category) => ({
      category: category.name,
      total: totals[category.key],
      list: `${baseUrl}/${category.key}`,
      single: `${baseUrl}/${category.key}/:id`
    }))
  });
});

categories.forEach((category) => {
  router.get(`/${category.key}`, async (req, res) => {
    res.json(await getList(category.key, req.query));
  });

  router.get(`/${category.key}/:id`, async (req, res) => {
    const id = parseWholeNumber(req.params.id);
    if (id === null || id < 1) {
      return res.status(400).json({ message: `Invalid ${category.singular} ID: ${req.params.id}. The ID must be a positive whole number.` });
    }

    const record = await getOne(category.key, id);
    if (!record) {
      return res.status(404).json({ message: `${capitalize(category.singular)} with ID ${id} not found` });
    }
    res.json(record);
  });
});

router.use((req, res) => {
  res.status(404).json({ message: `Endpoint ${req.method} ${req.originalUrl} not found. See /docs for the available endpoints.` });
});

router.use((error, req, res, next) => {
  console.error("API error:", error);
  res.status(500).json({ message: "Something went wrong on the server." });
});

module.exports = router;
