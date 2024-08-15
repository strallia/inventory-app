const db = require("../db/queries");

const getAllCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
};

const getAddCategoryForm = (req, res) => {
  res.render("addCategoryForm");
};

const postAddCategory = async (req, res) => {
  const { title } = req.body;
  await db.addCategory(title);
  res.redirect("/categories");
};

const getUpdateCategoryForm = async (req, res) => {
  const categoryID = req.params.id;
  const category = await db.findCategory(categoryID);
  res.render("updateCategoryForm", { category });
};

const putUpdateCategory = async (req, res) => {
  const categoryID = req.params.id;
  const { title } = req.body;
  await db.updateCategory(categoryID, title);
  res.redirect(`/categories`);
};

const getDeleteCategoryForm = async (req, res) => {
  const categoryID = req.params.id;
  const category = await db.findCategory(categoryID);
  const items = await db.getCategoryItems(categoryID);
  res.render("deleteCategoryForm", { category, items });
};

const deleteCategory = async (req, res) => {
  const categoryID = req.params.id;
  await db.deleteCategory(categoryID);
  res.redirect("/categories");
};

const getCategoryItems = async (req, res) => {
  const categoryID = req.params.id;
  const filteredItems = await db.getCategoryItems(categoryID);
  res.render("items", { items: filteredItems });
};

module.exports = {
  getAllCategories,
  getAddCategoryForm,
  postAddCategory,
  getUpdateCategoryForm,
  putUpdateCategory,
  getDeleteCategoryForm,
  deleteCategory,
  getCategoryItems,
};
