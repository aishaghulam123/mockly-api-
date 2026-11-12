require("dotenv").config();

const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");
const { connectDb } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

app.use("/", pageRoutes);

app.use((req, res) => {
  res.status(404).render("pages/not-found", { title: "Page not found - Mockly API", currentPage: "" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Something went wrong on the server.");
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Mockly API is running at http://localhost:${PORT}`);
    connectDb()
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.error("MongoDB connection failed:", error.message));
  });
}

module.exports = app;
