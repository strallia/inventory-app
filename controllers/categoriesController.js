let categories = require("../utils/categories");
const items = require("../utils/items");

const getAllCategories = (req, res) => {
  res.render("categories", { categories });
};

const deleteCategory = (req, res) => {
  const categoryID = req.params.id;
  const updatedCategories = categories.filter(
    (category) => category.id !== categoryID
  );
  categories = updatedCategories;
  res.redirect("/categories");
};

const getCategoryItems = (req, res) => {
  const categoryID = req.params.id;
  const filteredItems = items.filter((item) => item.categoryID == categoryID);
  res.render("items", { items: filteredItems });
};

module.exports = { getAllCategories, deleteCategory, getCategoryItems };
