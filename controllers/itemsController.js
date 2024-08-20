const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateItemForm = [
  body("title")
    .notEmpty()
    .withMessage("Title can not be empty.")
    .isLength({ max: 30 })
    .withMessage("Title can not be more than 30 characters"),
  body("categoryID").notEmpty().withMessage("Category can not be empty"),
];

const getAllItems = async (req, res) => {
  const items = await db.getAllItems();
  res.render("items", { items });
};

const getAddItemForm = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("addItemForm", { categories });
};

const postAddItem = [
  validateItemForm,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.render("addItemForm", {
        categories,
        errors: errors.array(),
      });
    }
    const { title, categoryID } = req.body;
    await db.addItem(title, categoryID);
    res.redirect("/items");
  },
];

const deleteItem = async (req, res) => {
  const itemID = req.params.id;
  await db.deleteItem(itemID);
  res.redirect("/items");
};

const getUpdateItemForm = async (req, res) => {
  const itemID = req.params.id;
  const item = await db.findItem(itemID);
  const categories = await db.getAllCategories();
  res.render("updateItemForm", { item, categories });
};

const putUpdateItem = [
  validateItemForm,
  async (req, res) => {
    const itemID = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const item = await db.findItem(itemID);
      const categories = await db.getAllCategories();
      return res.render("updateItemForm", {
        item,
        categories,
        errors: errors.array(),
      });
    }
    const { title, categoryID } = req.body;
    await db.updateItem(itemID, title, categoryID);
    res.redirect(`/items`);
  },
];

module.exports = {
  getAllItems,
  getAddItemForm,
  postAddItem,
  deleteItem,
  getUpdateItemForm,
  putUpdateItem,
};
