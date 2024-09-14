const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateItemForm = [
  body("title")
    .notEmpty()
    .withMessage("Title can not be empty.")
    .isLength({ max: 30 })
    .withMessage("Title can not be more than 30 characters"),
  body("categoryID").notEmpty().withMessage("Category can not be empty"),
  body("brandID").optional(),
  body("wheelsID").optional(),
];

const getAllItems = async (req, res) => {
  const items = await db.getAllItems();
  res.render("items", { items });
};

const getAddItemForm = async (req, res) => {
  const { errors } = req.query;
  const categories = await db.getAllCategories();
  const brands = await db.getAllBrands();
  const wheels = await db.getAllWheels();
  if (errors) {
    const errorsArr = JSON.parse(errors);
    return res.render("addItemForm", { categories, brands, wheels, errors: errorsArr });
  }
  res.render("addItemForm", { categories, brands, wheels });
};

const postAddItem = [
  validateItemForm,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArr = errors.array();
      const urlEncoded = encodeURIComponent(JSON.stringify(errorsArr));
      return res.redirect(`/items/new?errors=${urlEncoded}`);
    }
    const { title, categoryID, brandID, wheelsID } = req.body;
    await db.addItem(title, categoryID, brandID, wheelsID);
    res.redirect("/items");
  },
];

const deleteItem = async (req, res) => {
  const itemID = req.params.id;
  await db.deleteItem(itemID);
  res.redirect("/items");
};

const getUpdateItemForm = async (req, res) => {
  const { errors } = req.query;
  const itemID = req.params.id;
  const item = await db.findItem(itemID);
  const categories = await db.getAllCategories();
  const brands = await db.getAllBrands();
  const wheels = await db.getAllWheels();
  if (errors) {
    const errorsArr = JSON.parse(errors);
    return res.render("updateItemForm", { item, categories, brands, wheels, errors: errorsArr });
  }
  res.render("updateItemForm", { item, categories, brands, wheels });
};

const putUpdateItem = [
  validateItemForm,
  async (req, res) => {
    const itemID = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArr = errors.array();
      const urlEncoded = encodeURIComponent(JSON.stringify(errorsArr));
      return res.redirect(`/items/${itemID}/update?errors=${urlEncoded}`);
    }
    const {title, categoryID, brandID, wheelsID} = req.body;
    await db.updateItem(itemID, title, categoryID, brandID, wheelsID);
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
