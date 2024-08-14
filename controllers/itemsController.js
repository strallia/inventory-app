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

module.exports = { getAllItems, deleteItem };
