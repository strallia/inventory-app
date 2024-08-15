const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategoryForm = [
  body("title")
    .notEmpty()
    .withMessage("Title can not be empty.")
    .isLength({ max: 30 })
    .withMessage("Title can not be more than 30 characters"),
];

const getAllCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
};

const getAddCategoryForm = (req, res) => {
  res.render("addCategoryForm");
};

const postAddCategory = [
  validateCategoryForm,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("addCategoryForm", { errors: errors.array() });
    }
    const { title } = req.body;
    await db.addCategory(title);
    res.redirect("/categories");
  },
];

const getUpdateCategoryForm = async (req, res) => {
  const categoryID = req.params.id;
  const category = await db.findCategory(categoryID);
  res.render("updateCategoryForm", { category });
};

const putUpdateCategory = [
  validateCategoryForm,
  async (req, res) => {
    const errors = validationResult(req);
    const categoryID = req.params.id;
    if (!errors.isEmpty()) {
      const category = await db.findCategory(categoryID);
      return res.render("updateCategoryForm", {
        category,
        errors: errors.array(),
      });
    }
    const { title } = req.body;
    await db.updateCategory(categoryID, title);
    res.redirect(`/categories`);
  },
];

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
