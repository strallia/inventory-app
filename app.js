require("dotenv").config();
const express = require("express");
const path = require("node:path");
const categoriesRouter = require("./routes/categoriesRoutes");
const indexRouter = require("./routes/indexRoutes");
const itemsRouter = require("./routes/itemsRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
