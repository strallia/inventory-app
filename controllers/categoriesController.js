let categories = require("../utils/categories");
const items = require("../utils/items");

const getAllCategories = (req, res) => {
  res.render("categories", { categories });
};

const getUpdateCategoryForm = (req, res) => {
  const categoryID = req.params.id;
  const category = categories.find((category) => category.id == categoryID);
  res.render("categoryForm", { category });
};

const putUpdateCategory = (req, res) => {
  const categoryID = req.params.id;
  const { name } = req.body;
  const category = categories.find((category) => category.id == categoryID);
  category.name = name;
  res.redirect(`/categories`);
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

module.exports = {
  getAllCategories,
  getUpdateCategoryForm,
  putUpdateCategory,
  deleteCategory,
  getCategoryItems,
};
