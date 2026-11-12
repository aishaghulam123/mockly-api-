const express = require("express");
const { sampleData } = require("../config/sampleData");
const { categories } = require("../config/categories");
const { connectDb } = require("../config/db");
const { getTotals } = require("../services/dataService");

const router = express.Router();


async function loadPageData() {
  try {
    const db = await connectDb();
    const totals = await getTotals(categories);
    const samples = {};

    for (const category of categories) {
      const collection = db.collection(category.key);
      const list = await collection.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).limit(2).toArray();
      const single = await collection.findOne({ id: category.exampleId }, { projection: { _id: 0 } });
      samples[category.key] = { total: totals[category.key], list, single: single || list[0] };
    }
    return samples;
  } catch (error) {
    console.error("Pages are using sample data because the database is unavailable:", error.message);
    return sampleData;
  }
}

function buildStats(samples) {
  const recordCounts = {};
  categories.forEach((category) => {
    recordCounts[category.key] = samples[category.key].total;
  });

  return {
    recordCounts,
    stats: {
      categoryCount: categories.length,
      endpointCount: categories.length * 2,
      totalRecords: Object.values(recordCounts).reduce((sum, count) => sum + count, 0)
    }
  };
}

router.get("/", async (req, res) => {
  const { recordCounts, stats } = buildStats(await loadPageData());

  res.render("pages/home", {
    title: "Mockly API - Free mock REST API for testing",
    currentPage: "home",
    categories,
    recordCounts,
    stats
  });
});

router.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About - Mockly API",
    currentPage: "about",
    developer: {
      name: "Your Name",
      github: "https://github.com/your-username",
      linkedin: "https://www.linkedin.com/in/your-username"
    }
  });
});

router.get("/docs", async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/api`;
  const sampleSize = 2;
  const samples = await loadPageData();
  const { stats } = buildStats(samples);

  const docsCategories = categories.map((category) => {
    const data = samples[category.key];
    return {
      ...category,
      total: data.total,
      listSample: { [category.key]: data.list, total: data.total, skip: 0, limit: 10 },
      singleSample: data.single
    };
  });

  res.render("pages/docs", {
    title: "Documentation - Mockly API",
    currentPage: "docs",
    baseUrl,
    categories: docsCategories,
    sampleSize,
    stats
  });
});

module.exports = router;
