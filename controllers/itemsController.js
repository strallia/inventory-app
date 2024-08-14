let items = require("../utils/items");

const getAllItems = (req, res) => {
  res.render("items", { items });
};

const deleteItem = (req, res) => {
  const itemID = req.params.id;
  const updatedItems = items.filter((item) => item.id !== itemID);
  items = updatedItems;
  res.redirect("/items");
};

const getUpdateItemForm = (req, res) => {
  const itemID = req.params.id;
  const item = items.find((item) => item.id == itemID);
  res.render("updateItemForm", { item });
};

const putUpdateItem = (req, res) => {
  const itemID = req.params.id;
  const { name } = req.body;
  const item = items.find((item) => item.id == itemID);
  item.name = name;
  res.redirect(`/items`);
};

module.exports = { getAllItems, deleteItem, getUpdateItemForm, putUpdateItem };
