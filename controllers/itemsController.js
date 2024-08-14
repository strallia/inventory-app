let { items, runningItemID } = require("../utils/items");
let { categories } = require("../utils/categories");
const db = require("../db/queries");

const getAllItems = async (req, res) => {
  const items = await db.getAllItems();
  res.render("items", { items });
};

const getAddItemForm = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("addItemForm", { categories });
};

const postAddItem = async (req, res) => {
  const { title, categoryID } = req.body;
  await db.addItem(title, categoryID);
  res.redirect("/items");
};

const deleteItem = async (req, res) => {
  const itemID = req.params.id;
  await db.deleteItem(itemID);
  res.redirect("/items");
};

const getUpdateItemForm = async (req, res) => {
  const itemID = req.params.id;
  const item = await db.findItem(itemID);
  res.render("updateItemForm", { item });
};

const putUpdateItem = async (req, res) => {
  const itemID = req.params.id;
  const { title } = req.body;
  await db.updateItem(itemID, title);
  res.redirect(`/items`);
};

module.exports = {
  getAllItems,
  getAddItemForm,
  postAddItem,
  deleteItem,
  getUpdateItemForm,
  putUpdateItem,
};
